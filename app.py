import json
import time
import numpy as np
import websockets
from datetime import datetime
import asyncio

assets = {
    "WTI": {"mu_symbol": 6, "sigma_symbol": 47, "initial_price": 70.00, "spread": 0.1},
    "SOY": {"mu_symbol": 8, "sigma_symbol": 14, "initial_price": 995.0, "spread": 0.250},
    "YPF": {"mu_symbol": 16, "sigma_symbol": 46, "initial_price": 25.0, "spread": 0.5},
    "SP500": {"mu_symbol": 10, "sigma_symbol": 12, "initial_price": 5700, "spread": 5}
}

dt = 1 / 252

def simulator_asset_price(mu_symbol, sigma_symbol, initial_price, spread, days):
    mu_symbol /= 100 # Percentage to decimal conversion
    sigma_symbol /= 100 
    
    # Initial price
    S_last = initial_price
    # Calculate the number of decimal places in the Spread
    decimals = len(str(spread).split(".")[1]) if "." in str(spread) else 0
    simulated_prices = [S_last]
    
    for _ in range(days):
        S_i = S_last * (1 + mu_symbol * dt + sigma_symbol * np.sqrt(dt) * np.random.normal(0, 1))
        if decimals == 0:  # If spread has no decimals and S_i is an integer
            S_i = int(S_i)  # Convert to integer
        else:
            S_i = round(S_i, decimals) # Rounding decimals
        simulated_prices.append(S_i) # Add price to the simulation list
        S_last= S_i # Update S_last to next iteration
    return simulated_prices

# Send each new simulated price via Websocket
async def send_price_ws(ws, asset_name, simulated_prices):
    # Simulated prices of each asset
    for S_i in simulated_prices:
        spread = assets[asset_name]["spread"]
        decimals = len(str(spread).split('.')[1]) if '.' in str(spread) else 0

        print(f"S_i: {S_i}, Spread: {spread}")

        bid = round(S_i - spread, decimals)
        ask = round(S_i + spread, decimals)
        last = round(S_i, decimals)
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.000") # Current time
        
        # JSON message
        message = json.dumps({
            "Bid": bid,
            "Ask": ask,
            "Last": last,
            "Timestamp": timestamp,
        })
        
        # Display message via WebSocket
        await ws.send(message)
        print(f"Activo simulado {asset_name}: {message}")
        
        # The messages is sent every 200 milliseconds
        await asyncio.sleep(0.2)
        
# Handling WebSocket Connection
async def echo(websocket, path):
    await websocket.send("Successful connection to app.py")
    print("Client connected")
    
    # Simulate prices for each asset
    days = 7  # Simulate prices for 7 days
    for asset_name, asset_info in assets.items():
        simulated_prices = simulator_asset_price(
            asset_info["mu_symbol"],
            asset_info["sigma_symbol"],
            asset_info["initial_price"],
            asset_info["spread"],
            days
        )
        print(f"\nPrice simulation for {asset_name}:")
        
        # Send simulated prices
        await send_price_ws(websocket, asset_name, simulated_prices)
    
    try:
        async for message in websocket:
            print(f"Message received on websocket: {message}")
            await websocket.send(f"Echo: {message}")
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Close connection: {e}")

# Start the WebSocket server
async def start_server():
    server = await websockets.serve(echo, "localhost", 8080)
    print("WebSocket server started at ws://localhost:8080")
    await server.wait_closed()

# Run the WebSocket server
if __name__ == "__main__":
    asyncio.run(start_server())
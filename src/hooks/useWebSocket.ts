import { useEffect } from "react";

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

const useWebSocket = (
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Open Websocket Connection");
    };

    ws.onmessage = (event) => {
      // Backend connection message
      if (event.data === "Successful connection to app.py") {
        console.log("Connection to server established");
        return;
      }

      try {
        // Parse the message
        const message = JSON.parse(event.data);
        console.log("Message received from server:", message);

        // Verify that the data contains the expected keys
        if (
          message.Bid !== undefined &&
          message.Ask !== undefined &&
          message.Last !== undefined &&
          message.Timestamp !== undefined
        ) {
          const newAsset: Asset = {
            name: message.Name, 
            bid: message.Bid,
            ask: message.Ask,
            last: message.Last,
            timestamp: message.Timestamp,
          };

          // Update the status of the assets
          setAssets((prevAssets) => {
            const updatedAssets = [...prevAssets, newAsset];
            console.log("Updated asset data:", updatedAssets);
            return updatedAssets;
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };


    ws.onerror = (error) => {
      console.error("WebSocket connection failed:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Close the WebSocket connection when the component is unmounted
    return () => ws.close();
  }, [setAssets]);
};

export default useWebSocket;

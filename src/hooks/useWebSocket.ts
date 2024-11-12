import { useEffect } from "react";

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

const useWebSocket = (
  setAssets: React.Dispatch<React.SetStateAction<Record<string, Asset[]>>>,
  daysToSimulate: number | null
) => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Open Websocket Connection");

      // Connects with Websocket and if daysToSimulate is not null, the entered days are sent to the backend
      if (daysToSimulate !== null) {
        ws.send(JSON.stringify({ days: daysToSimulate }));
      }
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

        // Verify that the data sent from the server in JSON format is defined
        if (
          message.Name !== undefined &&
          message.Bid !== undefined &&
          message.Ask !== undefined &&
          message.Last !== undefined &&
          message.Timestamp !== undefined
        ) {
          // If all fields are defined, create a new asset object with the received data
          const newAsset: Asset = {
            name: message.Name,
            bid: message.Bid,
            ask: message.Ask,
            last: message.Last,
            timestamp: message.Timestamp,
          };

          setAssets((prevAssets) => {
            // Current asset object variable
            const updatedAssets = { ...prevAssets };

            // Verify if an array for the asset with that name already exists
            if (updatedAssets[newAsset.name]) {
              // If it exists, add the new asset
              updatedAssets[newAsset.name].push(newAsset);
            } else {
              // If it doesn't exist, create a new array for that asset type
              updatedAssets[newAsset.name] = [newAsset];
            }

            // Loops through the key or name of the updatedAssets object
            Object.keys(updatedAssets).forEach((key) => {
              if (daysToSimulate !== null) {
                // Keeps and shows the latest elements of the updatedAssets[key] array
                // And 1 is added to the simulated days to show data from day 0
                updatedAssets[key] = updatedAssets[key].slice(
                  -1 * (daysToSimulate + 1)
                );
              }
            });

            return updatedAssets; // Return all updated asset types
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
      console.log("WebSocket connection closed.");
    };

    // Close the WebSocket connection when the component is unmounted
    return () => ws.close();
  }, [setAssets, daysToSimulate]);

  return null;
};

export default useWebSocket;

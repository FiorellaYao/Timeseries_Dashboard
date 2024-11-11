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
      console.log("Conexión WebSocket abierta.");
    };

    ws.onmessage = (event) => {
      // Verifica si es el mensaje de conexión
      if (event.data === "Conexión exitosa con server.py") {
        console.log("Conexión con el servidor establecida.");
        return; // Si es el mensaje de conexión, solo logueamos y no hacemos nada más
      }

      try {
        // Intenta parsear el mensaje (solo si no es el mensaje de conexión)
        const message = JSON.parse(event.data);
        console.log("Mensaje recibido del servidor:", message); // Añadido para depurar

        // Verifica que los datos contengan las claves esperadas
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

          // Actualiza el estado de los activos
          setAssets((prevAssets) => {
            const updatedAssets = [...prevAssets, newAsset];
            console.log("Datos actualizados de assets:", updatedAssets); 
            return updatedAssets;
          });
        }
      } catch (error) {
        console.error("Error al procesar el mensaje WebSocket:", error);
      }
    };


    ws.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
    };

    // Cierra la conexión WebSocket al desmontar el componente
    return () => ws.close();
  }, [setAssets]);
};

export default useWebSocket;

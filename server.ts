import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON with increased limit for images
  app.use(express.json({ limit: '10mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/weather", async (req, res) => {
    const { district, lat, lon } = req.query;
    try {
      let finalLat = lat;
      let finalLon = lon;

      // If lat/lon not provided but district is, use a geocoding approximation or fallback to Open-Meteo geocoding
      if (!finalLat || !finalLon) {
        if (!district) {
          return res.status(400).json({ error: "District or lat/lon required" });
        }
        // Use Open-Meteo geocoding API
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(district as string)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();
        if (geoData.results && geoData.results.length > 0) {
          finalLat = geoData.results[0].latitude;
          finalLon = geoData.results[0].longitude;
        } else {
          // Default to Bangalore coords if district not found
          finalLat = "12.9716";
          finalLon = "77.5946";
        }
      }

      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${finalLat}&longitude=${finalLon}&current=temperature_2m,weather_code&timezone=auto`);
      const weatherData = await weatherResponse.json();

      let temp = weatherData?.current?.temperature_2m ?? 25;
      
      // Send the response
      res.json({
        temp: temp,
        description: "Clear", // simplified for now
        next: "Sunny"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "reservations.json");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20kb" }));

const clean = (value, max = 200) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/reservation", (req, res) => {
  const name = clean(req.body.name, 80);
  const phone = clean(req.body.phone, 30);
  const date = clean(req.body.date, 10);
  const time = clean(req.body.time, 5);
  const guests = Number(req.body.guests);
  const type = req.body.type === "salon" ? "salon" : "table";
  const message = clean(req.body.message, 500);

  if (!name || !phone || !date || !time || !Number.isInteger(guests) || guests < 1 || guests > 60) {
    return res.status(400).json({ error: "Champs obligatoires manquants ou invalides." });
  }

  const reservation = {
    id: Date.now().toString(36),
    name,
    phone,
    date,
    time,
    guests,
    type,
    message: message || null,
    receivedAt: new Date().toISOString(),
  };

  const reservations = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  reservations.push(reservation);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2));

  const label = type === "salon" ? "salon privé" : "table";
  console.log(`Nouvelle réservation (${label}) : ${name} — ${date} ${time} (${guests} pers.)`);
  res.status(201).json({ success: true, reservation });
});

// En production, le serveur sert aussi le site compilé (npm run build).
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

// En dev, le port est passé en argument (--port=5055) pour ne pas entrer en conflit
// avec la variable PORT utilisée par Vite ; en production, PORT est fourni par l'hébergeur.
const portArg = process.argv.find((arg) => arg.startsWith("--port="));
const PORT = portArg ? Number(portArg.split("=")[1]) : process.env.PORT || 5055;
app.listen(PORT, () => {
  console.log(`鑫龙饭店 API en écoute sur http://localhost:${PORT}`);
});

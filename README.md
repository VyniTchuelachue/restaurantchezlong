# 鑫龙饭店 Chez Long — Site Web

Site vitrine du restaurant chinois **鑫龙饭店** à Bonapriso, Douala, en 中文 + français
(un interrupteur FR/EN à côté de « Français » passe toute la partie française en anglais).
React + TypeScript + Tailwind CSS (client) et Node.js / Express (serveur de réservations).

## Structure

```
client/   → App React (Vite + TypeScript + Tailwind)
  src/data/restaurant.ts   ← tout le contenu : coordonnées, plats, menu, photos
  src/components/sections/ ← une section de la page par fichier
server/   → API Express : enregistre les réservations dans server/data/reservations.json
```

## Démarrage

```bash
npm run install:all
npm run dev          # client http://localhost:5173 + API http://localhost:5055
```

## Production

- **Avec le serveur Node** : `npm run build` puis `npm start` — Express sert le site
  compilé et l'API `/api/reservation` sur le même port (`PORT`, 5055 par défaut).
- **Vercel (statique)** : `vercel.json` est prêt. Sans serveur, le formulaire de
  réservation bascule automatiquement sur WhatsApp (message pré-rempli).

## Informations reprises de Google Maps

Nom 鑫龙饭店 · Téléphone +237 6 74 56 20 67 · Plus code 2PF2+Q4 Douala · Note 4,4.
La fiche n'indique ni horaires ni carte : le menu du site est **indicatif** (sans prix),
à ajuster dans `client/src/data/restaurant.ts`.

## Photos

Les photos actuelles sont des illustrations Unsplash (libres de droits). Pour utiliser
les vraies photos du restaurant, placez-les dans `client/public/images/` et remplacez
les URL dans `client/src/data/restaurant.ts` (ex. `"/images/salle.jpg"`).

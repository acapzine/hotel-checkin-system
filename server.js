import { writeData, intake } from "./backend.js";
import { getOpenRoom, changeRoomStatus } from "./assignment-backend.js";

import express from "express";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(join(__dirname, "public")));
app.use(express.json());

app.post("/check-in", async (req, res) => {
  const { roomType, name } = req.body;

  const data = await intake();

  const roomNumber = getOpenRoom(data, roomType);
  const modifiedData = changeRoomStatus(data, roomNumber, true, name);

  await writeData(modifiedData);

  return res.sendStatus(200);
});
app.post("/check-out", async (req, res) => {
  const { roomNumber } = req.body;

  const data = await intake();

  const modifiedData = changeRoomStatus(data, roomNumber, true);

  await writeData(modifiedData);

  return res.sendStatus(200);
});

app.get("/room-status", async (req, res) => {
  const data = await intake();

  return res.status(200).send({ data });
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));

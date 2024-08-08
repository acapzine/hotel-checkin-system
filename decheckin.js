import { writeFile, readFile } from "node:fs/promises";
import { roomTypes } from "./config.js";

(async () => {
    try {
        const data = await readFile("./data/rooms.json", "utf8");
        const jsonObject = JSON.parse(data);

        roomTypes.forEach(area => {
            for (const room of jsonObject[area]) {
                room.taken = false;
                room.occupant = "";
            }
        });

        await writeFile("./data/rooms.json", JSON.stringify(jsonObject, null, 2), "utf8");
        console.log("All rooms are no longer taken!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
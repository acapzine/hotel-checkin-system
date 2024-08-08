import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const roomsPath = join(__dirname, "data", "rooms.json");

/**
 * Intakes data from rooms.json and returns a JSON object with the data inside
 * @returns {Promise<JSON[]>}
 * @async
 */
const intake = async () => {
  try {
    const data = await readFile(roomsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error whilst reading data: ${error}`);
  }
};
/**
 * Writes new data
 * @param {JSON[]} data
 * @async
 */
const writeData = async (data) => {
  try {
    await writeFile(roomsPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    throw new Error(`Error whilst writing data: ${error}`);
  }
};

export { intake, writeData };

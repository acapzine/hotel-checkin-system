import { roomTypes } from "./config.js";
import { getOpenRoom, changeRoomStatus } from "./assignment-backend.js";
import { writeData, intake } from "./backend.js";
import inquirer from "inquirer";

const questions = [
  {
    type: "confirm",
    name: "checkin",
    message: "Are you checking someone in?",
  },
];
const checkInQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the patron?",
  },
  {
    type: "list",
    name: "roomType",
    message: "What type of room do they want?",
    choices: roomTypes,
  },
  {
    type: "password",
    name: "creditCard",
    message: "Please enter the credit card number for the room's charges",
  },
];
const checkOutQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the patron?",
  },
  {
    type: "input",
    name: "roomNumber",
    message: "What is their room number?",
  },
];

async function main() {
  const data = await intake();

  inquirer
    .prompt(questions)
    .then((answer) => {
      if (answer.checkin) {
        inquirer
          .prompt(checkInQuestions)
          .then(async (answers) => {
            const roomNumber = getOpenRoom(data, answers.roomType);
            const modified = changeRoomStatus(data, roomNumber, true, answers.name);

            await writeData(modified);

            console.log(`Checked ${answers.name} into Room #${roomNumber}`);
          })
          .catch((error) => {
            throw new Error(
              `Error while prompting question sequence 2 (checkin): ${error}`,
            );
          });
      } else {
        inquirer
          .prompt(checkOutQuestions)
          .then(async (answers) => {
            const modified = changeRoomStatus(data, answers.roomNumber, false);

            await writeData(modified);

            console.log(
              `Checked ${answers.name} out of Room #${answers.roomNumber}`,
            );
          })
          .catch((error) => {
            throw new Error(
              `Error while prompting question sequence 3 (checkout): ${error}`,
            );
          });
      }
    })
    .catch((error) => {
      throw new Error(
        `Error while prompting question sequence 1 (main): ${error}`,
      );
    });
}

main();
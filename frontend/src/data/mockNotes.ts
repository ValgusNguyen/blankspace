import { faker } from "@faker-js/faker";
import { v7 as uuidv7 } from "uuid";

const createRandomNote = () => {
  return {
    id: uuidv7(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    date: faker.date.anytime(),
    content: faker.lorem.sentences(),
  };
};

const MOCK_NOTES_COUNT = 20;
const mockNotes = Array.from({ length: MOCK_NOTES_COUNT }, () =>
  createRandomNote(),
);

export default mockNotes;

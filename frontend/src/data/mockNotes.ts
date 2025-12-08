import { faker } from "@faker-js/faker";
import { v7 as uuidv7 } from "uuid";

// NOTE: The issue next reporting is related to date generated in mock which a known issue
const createRandomNote = () => {
  return {
    id: uuidv7(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    updatedAt: faker.date.past(),
    content: faker.lorem.sentences(),
  };
};

const MOCK_NOTES_COUNT = 20;
const mockNotes = Array.from({ length: MOCK_NOTES_COUNT }, (_, i) => {
  if (!i) {
    return {
      id: uuidv7(),
      title: "Japan Travel",
      updatedAt: faker.date.past(),
      content: "Planning to go to Japan which definitely there and will happen",
    };
  }

  return createRandomNote();
});

export default mockNotes;

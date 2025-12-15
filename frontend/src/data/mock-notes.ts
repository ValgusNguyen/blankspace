import { faker } from "@faker-js/faker";
import { v7 as uuidv7 } from "uuid";

const createRandomNote = () => {
  return {
    id: uuidv7() as string,
    title: faker.lorem.words({ min: 2, max: 5 }),
    updatedAt: faker.date.past(),
    content: faker.lorem.sentences(),
  };
};

const MOCK_NOTES_COUNT = 20;

export const mockNotes = Array.from({ length: MOCK_NOTES_COUNT }, (_, i) => {
  if (!i) {
    return {
      id: "00000000-0000-0000-0000-000000000001",
      title: "Japan Travel",
      updatedAt: new Date("2024-01-01T00:00:00.000Z"),
      content: "Planning to go to Japan which definitely there and will happen",
    };
  }

  return createRandomNote();
});

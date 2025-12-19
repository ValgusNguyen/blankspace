import { faker } from "@faker-js/faker";
import { v7 as uuidv7 } from "uuid";
import japanTravelContent from "./japan-travel-content.html?raw";

const createRandomNote = () => {
  return {
    id: uuidv7() as string,
    title: faker.lorem.words({ min: 2, max: 5 }),
    updatedAt: faker.date.past(),
    content: generateRandomHtml(),
  };
};

const generateRandomHtml = () => {
  const title = faker.lorem.sentence(5);
  let post = `<h1>${title}</h1>`;

  const numParagraphs = faker.number.int({ min: 2, max: 6 });
  for (let i = 0; i < numParagraphs; i++) {
    post += `<p>${faker.lorem.paragraph(faker.number.int({ min: 1, max: 5 }))}</p>`;
  }

  post += `<img src="${faker.image.url()}" alt="Random image placeholder" />`;

  return post;
};

const MOCK_NOTES_COUNT = 20;

export const mockNotes = Array.from({ length: MOCK_NOTES_COUNT }, (_, i) => {
  if (!i) {
    return {
      id: "00000000-0000-0000-0000-000000000001",
      title: "Japan Travel",
      updatedAt: new Date("2024-01-01T00:00:00.000Z"),
      content: japanTravelContent,
    };
  }

  return createRandomNote();
});

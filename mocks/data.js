var faker = require('faker');

const allWords = [];

var generateRandomWord = function() {
  const word = faker.random.word();
  allWords.push(word);
  return word;
};

/**
 * Generate a set of Apis
 */
var generateAPIs = function() {
  const apis = [];
  for (let i = 0; i < 20; i++) {
    apis.push({
      name: `${generateRandomWord()} ${generateRandomWord()} ${generateRandomWord()} ${generateRandomWord()} `,
      version: faker.random.arrayElement(['1.0.1', '2.0.0', '3.5.9']),
      description: faker.lorem.sentence(),
      status: 'BETA',
      tags: [generateRandomWord(), generateRandomWord(), generateRandomWord()],
      swaggerDefinition: null,
      id: faker.random.uuid()
    });
  }
  return apis;
};

var generateSuggestions = function() {
  return allWords;
};

module.exports = () => {
  const apis = generateAPIs();
  const suggestions = generateSuggestions();
  return { apis, suggestions };
};

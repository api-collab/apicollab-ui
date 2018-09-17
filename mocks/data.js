var faker = require('faker');

const allWords = [];

var generateRandomWord = function() {
  const word = faker.random.word();
  allWords.push(word);
  return word;
};

/**
 * Generate a set of applications
 */
var generateApplications = function() {
  const apps = [];
  const categories = ['Commerce', 'Entertainment', 'Communications', 'Gaming', 'Education'];
  for (let i = 0; i < 5; i++) {
    const appId = faker.random.uuid();
    apps.push({
      name: generateRandomWord(),
      email: faker.internet.email(),
      id: appId,
      applicationId: appId,
      category: faker.random.arrayElement(categories)
    });
  }
  return apps;
};

/**
 * Generate a set of Apis for a given set of apps
 */
var generateAPIs = function(apps) {
  const apis = [];
  for (let i = 0; i < 20; i++) {
    const appId = faker.random.arrayElement(apps).id;
    apis.push({
      name: `${generateRandomWord()} ${generateRandomWord()} ${generateRandomWord()} ${generateRandomWord()} `,
      version: faker.random.arrayElement(['1.0.1', '2.0.0', '3.5.9']),
      description: faker.lorem.sentence(),
      status: faker.random.arrayElement(['BETA', 'STABLE', 'DEPRECATED']),
      tags: [generateRandomWord(), generateRandomWord(), generateRandomWord()],
      swaggerDefinition: null,
      id: faker.random.uuid(),
      applicationId: appId
    });
  }
  return apis;
};

var generateSuggestions = function() {
  return allWords;
};

module.exports = () => {
  const applications = generateApplications();
  const apis = generateAPIs(applications);
  const suggestions = generateSuggestions();
  return { apis, suggestions, applications };
};

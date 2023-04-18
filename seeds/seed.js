const sequelize = require("../config/connection");
const seedUsers = require("./userSeeds.json");
const seedBlogs = require("./blogSeeds.json");
// const seedReviews = require("./reviewSeeds");
// const seedComments = require("./commentSeeds.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedBlogs();

  // await seedReviews();

  // await seedComments();

  process.exit(0);
};

seedAll();

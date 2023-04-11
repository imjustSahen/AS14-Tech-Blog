const { Blog } = require("../models");

const blogData = [
  {
    beer_id: 2,
    dish_id: 3,
    user_id: 2,
  },
  {
    beer_id: 2,
    dish_id: 22,
    user_id: 1,
  },
];

const seedGallery = () => Blog.bulkCreate(blogData);

module.exports = seedGallery;

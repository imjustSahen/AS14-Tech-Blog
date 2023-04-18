const router = require("express").Router();

const userRoutes = require("./user");
const blogRoutes = require("./blog");
const commentRoutes = require("./comment");

//localhost:3001/api
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
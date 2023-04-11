const router = require("express").Router();

const userRoutes = require("./user-routes");
const blogRoutes = require("./blog-routes");
const commentRoutes = require("./comment-routes");

//localhost:3001/api
router.use("/user-routes", userRoutes);
router.use("/blog-routes", blogRoutes);
router.use("/comment-routes", commentRoutes);

module.exports = router;
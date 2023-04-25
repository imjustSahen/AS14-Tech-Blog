const router = require("express").Router();

const userRoutes = require("./user");
const blogRoutes = require("./blog");
const commentRoutes = require("./comment");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
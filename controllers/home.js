const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Comment, Blog } = require("../models");

// Renders Homepage
router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({
    include: User,
  });
  const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

  res.render("home", {
    blogs,
    loggedIn: req.session.loggedIn,
  });
});

// Renders single blog
router.get("/blog/:id", withAuth, async (req, res) => {
  const blog = await Blog.findOne({
    where: { id: req.params.id },
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  });
  const blogData = blog.get({ plain: true });
  res.render("single-blog", {
    loggedIn: req.session.loggedIn,
    blogData,
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

module.exports = router;

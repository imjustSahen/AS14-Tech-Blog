const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  const user = await User.findOne({
    where: { id: req.session.user_id },
  });
  const userInfo = user.get({ plain: true });

  const blogData = await Blog.findAll({
    where: { user_id: req.session.user_id },
  });
  const userBlogs = blogData.map((blogs) => blogs.get({ plain: true }));

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    userBlogs,
    userInfo,
  });
});

router.get("/blog", withAuth, (req, res) => {
  res.render("blog", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  const blog = await Blog.findOne({
    where: { id: req.params.id },
  });
  const blogData = await blog.get({ plain: true });

  res.render("edit-blog", {
    loggedIn: req.session.loggedIn,
    blogData,
  });
});

module.exports = router;

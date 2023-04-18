const router = require("express").Router();
const path = require("path");
const { User, Comment, Blog } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ["id", "title", "content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "user_id"],
          include: {
            model: User,
            attributes: ["email"],
          },
        },
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });

    const blogs = await blogData.map((blog) => blog.get({ plain: true }));

    res.render("home", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogById = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "user_id"],
          include: {
            model: User,
            attributes: ["email"],
          },
        },
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });

    if (!blogById) {
      res.status(404).json({
        message: "No blog found",
      });
      return;
    }

    const blog = blogById.get({ plain: true });

    res.render("single-blog", {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("*", (req, res) => {
  res.status(404).send("Oops wrong page!");
});

module.exports = router;

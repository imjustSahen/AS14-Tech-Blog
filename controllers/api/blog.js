const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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
    // .then((dbPostData) => res.json(dbPostData))
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
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

    // .then((dbPostData) => {
    //   if (!dbPostData) {
    //     res.status(404).json({
    //       message: "No post found with this id",
    //     });
    //     return;
    //   }

    const blog = blogById.get({ plain: true });

    res.render("single-blog", {
      blog,
      loggedIn: req.session.loggedIn,
    });

    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, (req, res) => {
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((blogData) => {
      req.session.save(() => {
        req.session.user_id = blogData.id;
        req.body.title = blogData.title;
        req.body.content = blogData.content;

        res.json(blogData);
        console.log(blogData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new blog
router.post("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Update a blog
router.put("/:id", withAuth, async (req, res) => {
  try {
    await Blog.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("/dashboard");
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("/dashboard");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

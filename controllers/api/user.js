const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Get specific user
// router.get("/:id", (req, res) => {
//   User.findOne({
//     attributes: {
//       exclude: ["password"],
//     },
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       {
//         model: Blog,
//         attributes: ["id", "title", "content", "date_created"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment_text"],
//         include: {
//           model: Blog,
//           attributes: ["title"],
//         },
//       },
//     ],
//   })
//     .then((userData) => {
//       if (!userData) {
//         res.status(404).json({
//           message: "No user found with this id",
//         });
//         return;
//       }
//       res.json(userData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// Create a user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_email = userData.email;
      req.session.loggedIn = true;
      res.status(200).json({
        user: userData,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const router = require("express").Router();
const { User, Blog, Comment, Review } = require("../models");

router.get("/", async (req, res) => {
  try {
    // const blogData = await Blog.findAll({
    //   limit: 2,
    //   attributes: { exclude: ["user_id"] },
    //   include: [
    //     {
    //       model: Review,
    //       attributes: { exclude: ["blog_id", "user_id"] },
    //       include: [
    //         { model: User, attributes: { exclude: ["id", "password"] } },
    //       ],
    //     },
    //   ],
    // });

    // const blogs = await blogData.map((pairing) =>
    //   pairing.get({ plain: true })
    // );

    res.render("home", {
      // blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/about-us", (req, res) => {
  res.render("aboutUs", { loggedIn: req.session.loggedIn });
});

router.get("/contact-us", (req, res) => {
  res.render("contactUs", { loggedIn: req.session.loggedIn });
});

// router.get("/pairing", async (req, res) => {
//   try {
//     if (req.session.loggedIn) {
//       const pairingData = await Pairing.findAll({
//         where: { user_id: req.session.user_id },
//         attributes: { exclude: ["user_id"] },
//         include: [
//           {
//             model: Review,
//             attributes: { exclude: ["pairing_id", "user_id"] },
//             include: [
//               { model: User, attributes: { exclude: ["id", "password"] } },
//             ],
//           },
//         ],
//       });

//       const pairings = pairingData.map((pairing) =>
//         pairing.get({ plain: true })
//       );

//       res.render("pairing", {
//         pairings,
//         loggedIn: req.session.loggedIn,
//       });
//     } else {
//       res.render("pairing");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

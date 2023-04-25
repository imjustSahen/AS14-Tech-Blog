const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home");
const dashboardRoutes = require("./dashboard");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const about = require("./aboutus");
const tools = require("./tools");
const services = require("./services");
const contactus = require("./contactus");
const mail = require("./mail");
const resourceteam = require("./resourceteam");
const testimonial = require("./testimonial");
const subscribers = require("./subscribers");
const users = require("./users");
const auth = require("./auth");

router.use("/admin", auth);
router.use("/aboutus", about);
router.use("/alpha-tools", tools);
router.use("/mail", mail);
router.use("/alpha-services", services);
router.use("/contactus", contactus);
router.use("/resourceteam", resourceteam);
router.use("/testimonial", testimonial);
router.use("/subscribers", subscribers);
router.use("/users", users);

module.exports = router;
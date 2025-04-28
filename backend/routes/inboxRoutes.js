const express = require("express");

const authController = require("../controllers/authenticationControlller");
const inboxController = require("../controllers/inboxController");

const router = express.Router();

router
  .route("/sendReactivateRequest")
  .post(inboxController.sendReactivateRequest);

router.use(authController.protect);

router.route("/sendReport").post(inboxController.sendRecipeReport);

router.use(authController.restrictTo("admin"));

router.get(
  "/",
  authController.restrictTo("admin"),
  inboxController.getInboxMessages
);

module.exports = router;

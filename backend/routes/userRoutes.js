const express = require("express");
const authController = require("../controllers/authenticationControlller");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateMe", userController.updateMe);
router.get("/me", userController.getMe, userController.getUser);

router.use(authController.restrictTo("admin"));

router.get("/all", userController.getAllUsers);
// router.patch("/updatedUser", userController.updateUser);
// router.route("/:id").patch(userController.updateUser)

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUserAdmin)
  .delete(userController.deleteUser);

module.exports = router;

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Inbox = require("../models/inboxModel");
const User = require("../models/userModel");
const Email = require("../utils/email");

exports.sendReactivateRequest = catchAsync(async (req, res, next) => {
  const { message, email } = req.body;

  const userId = await User.findOne({ email }).select("_id");
  const user = await User.findOne({ email });

  if (!message || message.trim() === "" || !email || email.trim() === "") {
    return next(
      new AppError("Message is required to send a reactivation request.", 400)
    );
  }

  await Inbox.create({
    userId,
    message,
    type: "reactivate",
  });

  const url = "https://nutricook-frontend.vercel.app/me";
  await new Email(user, url, "rasheedtaha111@gmail.com").sendAdminMessage();

  res.status(200).json({
    status: "success",
    message: "Your reactivation request has been sent to the admin.",
  });
});

exports.sendRecipeReport = catchAsync(async (req, res, next) => {
  const { message, recipeId } = req.body;

  if (!message || message.trim() === "") {
    return next(new AppError("Message is required to report a recipe.", 400));
  }

  await Inbox.create({
    userId: req.user.id,
    recipeId,
    message,
    type: "report",
  });

  res.status(200).json({
    status: "success",
    message: "Your recipe report has been sent to the admin.",
  });
});

exports.getInboxMessages = catchAsync(async (req, res, next) => {
  const messages = await Inbox.find().populate("userId");

  res.status(200).json({
    status: "success",
    data: messages,
  });
});

const Like = require("../models/likeModel");
const Recipe = require("../models/recipeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.toggleLike = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Recipe ID from the URL
  const userId = req.user.id; // Authenticated user's ID

  // Check if the recipe exists
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  // Check if the user has already liked the recipe
  const existingLike = await Like.findOne({ user: userId, recipe: id });
  // Your recipe model
  if (!existingLike) {
    // If no like exists, create a new like
    await Like.create({ user: userId, recipe: id });
  } else {
    // If the user already liked the recipe, remove the like
    await Like.findOneAndDelete({ user: userId, recipe: id });
  }

  // Get the updated like count
  const likeCount = await Like.countDocuments({ recipe: id }); // Count likes for the recipe

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { likes: likeCount }, // Update the likes field
    { new: true } // Return the updated document
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedRecipe,
      likeCount,
    },
  });
});

exports.getLikedRecipes = catchAsync(async (req, res) => {
  const { id } = req.params;
  // Find all likes by the user and populate recipe details
  const likedRecipes = await Like.find({ user: id })
    .populate({
      path: "recipe",
      populate: {
        path: "createdBy",
        select: "name -_id",
      },
    })
    .populate("user", "name _id"); // the user who liked the recipe

  return res.status(200).json({
    status: "success",
    results: likedRecipes.length,
    data: {
      recipes: likedRecipes,
    },
  });
});

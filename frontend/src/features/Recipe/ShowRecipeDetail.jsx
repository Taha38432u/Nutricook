import { useParams } from "react-router-dom";
import useGetSingleRecipe from "../../services/recipe/useGetSingleRecipe";
import {
  FaUser,
  FaClock,
  FaUtensils,
  FaListAlt,
  FaGlobe,
} from "react-icons/fa";
import { useRef } from "react";
import NutrientItem from "./NutrientItem.jsx";

function ShowRecipeDetail() {
  const { id } = useParams();
  const { isLoading, singleRecipe, error } = useGetSingleRecipe(id);

  const Data = useRef(null);

  if (isLoading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const {
    title,
    description,
    ingredients,
    instructions,
    preparationTime,
    cookingTime,
    cuisine,
    dietaryPreferences,
    userName,
  } = singleRecipe.data.recipe;

  Data.current = ingredients.map((ingredient) => ({
    name: ingredient.ingName,
    calories: ingredient.nutrients.calories.toFixed(2),
    protein: ingredient.nutrients.protein.toFixed(2),
    fat: ingredient.nutrients.fat.toFixed(2),
    carbohydrates: ingredient.nutrients.carbohydrates.toFixed(2),
    vitamins: {
      sodium: Number(ingredient.nutrients.vitamins.sodium).toFixed(2),
      potassium: Number(ingredient.nutrients.vitamins.potassium).toFixed(2),
      cholesterol: Number(ingredient.nutrients.vitamins.cholesterol).toFixed(2),
      fiber: Number(ingredient.nutrients.vitamins.fiber).toFixed(2),
      sugar: Number(ingredient.nutrients.vitamins.sugar).toFixed(2),
    },
  }));

  return (
    <div className="mx-auto my-10 mt-10 max-w-4xl rounded-lg bg-gray-800 p-6 text-gray-200 shadow-lg">
      {/* Recipe Title */}
      <h1 className="mb-4 text-3xl font-bold text-white">{title}</h1>

      {/* Author */}
      <p className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <FaUser />
        <span>
          <strong>By:</strong> {userName?.name || "Anonymous"}
        </span>
      </p>

      {/* Description */}
      <p className="mb-6 italic text-gray-300">
        {description || "No description available."}
      </p>

      <hr className="mb-6 border-gray-600" />

      {/* Recipe Details */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        {/* Preparation Time */}
        <div className="flex items-center gap-2 text-gray-400">
          <FaClock className="text-blue-400" />
          <span>
            <strong>Prep Time:</strong> {preparationTime} mins
          </span>
        </div>

        {/* Cooking Time */}
        <div className="flex items-center gap-2 text-gray-400">
          <FaClock className="text-green-400" />
          <span>
            <strong>Cook Time:</strong> {cookingTime} mins
          </span>
        </div>

        {/* Cuisine */}
        <div className="flex items-center gap-2 text-gray-400">
          <FaGlobe className="text-yellow-400" />
          <span>
            <strong>Cuisine:</strong> {cuisine}
          </span>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <FaListAlt className="text-red-400" />
          Ingredients
        </h2>
        <ul className="list-inside list-disc text-gray-300">
          {ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient.ingName}</li>
          )) || <p>No ingredients listed.</p>}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <FaUtensils className="text-purple-400" />
          Instructions
        </h2>
        <ol className="list-inside list-decimal text-gray-300">
          {instructions?.map((step, index) => <li key={index}>{step}</li>) || (
            <p>No instructions provided.</p>
          )}
        </ol>
      </div>

      {/* Dietary Preferences */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <FaUtensils className="text-teal-400" />
          Dietary Preferences
        </h2>
        <p className="text-gray-300">
          {dietaryPreferences || "No specific preferences."}
        </p>
      </div>

      <hr className="mb-6 mt-6 border-gray-600" />
      <div className="mt-8">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Total Nutrients
        </h2>
        {singleRecipe.data.recipe.totalNutrients && (
          <NutrientItem data={singleRecipe.data.recipe.totalNutrients} />
        )}
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Nutrient Breakdown
        </h2>
        {Data.current.map((data, index) => (
          <NutrientItem data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ShowRecipeDetail;

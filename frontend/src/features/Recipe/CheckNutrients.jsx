import { useState, useRef } from "react";
import { FaFire, FaLeaf, FaPlusCircle } from "react-icons/fa";
import useGetNutrients from "../../services/recipe/useGetNutrients.js";
import NutrientItem from "./NutrientItem.jsx";
import Loading from "../../ui/Loading.jsx";

function CheckNutrients() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [nutrientData, setNutrientData] = useState(null);
  const { trigger, isLoading } = useGetNutrients();

  // Ref to preserve total nutrients across renders
  const totalNutrientsRef = useRef(null);

  const addIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  const calculateNutrients = async () => {
    const body = {
      ingredients: ingredients.map((ing) => ({
        ingName: ing, // Each object contains a key "ingName" with the ingredient as the value
      })),
    };

    try {
      const response = await trigger(body);

      const updatedIngredients = response.data.updatedIngredients;

      const Data = updatedIngredients.map((ingredient) => ({
        name: ingredient.ingName,
        calories: ingredient.nutrients.calories.toFixed(2),
        protein: ingredient.nutrients.protein.toFixed(2),
        fat: ingredient.nutrients.fat.toFixed(2),
        carbohydrates: ingredient.nutrients.carbohydrates.toFixed(2),
        vitamins: {
          sodium: ingredient.nutrients.vitamins.sodium.toFixed(2),
          potassium: ingredient.nutrients.vitamins.potassium.toFixed(2),
          cholesterol: ingredient.nutrients.vitamins.cholesterol.toFixed(2),
          fiber: ingredient.nutrients.vitamins.fiber.toFixed(2),
          sugar: ingredient.nutrients.vitamins.sugar.toFixed(2),
        },
      }));

      // Calculate totals
      const totals = updatedIngredients.reduce(
        (acc, ingredient) => {
          acc.calories += ingredient.nutrients.calories;
          acc.protein += ingredient.nutrients.protein;
          acc.fat += ingredient.nutrients.fat;
          acc.carbohydrates += ingredient.nutrients.carbohydrates;
          acc.vitamins.sodium += ingredient.nutrients.vitamins.sodium;
          acc.vitamins.potassium += ingredient.nutrients.vitamins.potassium;
          acc.vitamins.cholesterol += ingredient.nutrients.vitamins.cholesterol;
          acc.vitamins.fiber += ingredient.nutrients.vitamins.fiber;
          acc.vitamins.sugar += ingredient.nutrients.vitamins.sugar;
          return acc;
        },
        {
          calories: 0,
          protein: 0,
          fat: 0,
          carbohydrates: 0,
          vitamins: {
            sodium: 0,
            potassium: 0,
            cholesterol: 0,
            fiber: 0,
            sugar: 0,
          },
        },
      );

      // Format totals and store in the ref
      totalNutrientsRef.current = {
        ...totals,
        calories: totals.calories.toFixed(2),
        protein: totals.protein.toFixed(2),
        fat: totals.fat.toFixed(2),
        carbohydrates: totals.carbohydrates.toFixed(2),
        vitamins: {
          sodium: totals.vitamins.sodium.toFixed(2),
          potassium: totals.vitamins.potassium.toFixed(2),
          cholesterol: totals.vitamins.cholesterol.toFixed(2),
          fiber: totals.vitamins.fiber.toFixed(2),
          sugar: totals.vitamins.sugar.toFixed(2),
        },
      };

      setNutrientData(Data);
    } catch (error) {
      // console.error("Error calculating nutrients:", error);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900">
      <div className="w-full max-w-3xl rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 sm:p-8 text-white shadow-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          <FaLeaf className="mr-2 inline-block text-green-400" />
          Check Nutrients
        </h1>

        {/* Add Ingredient Section */}
        <div className="mb-6 flex flex-col items-start justify-start gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Enter ingredient name"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            className="input"
          />
          <button
            onClick={addIngredient}
            className="flex items-center justify-center w-full gap-2 rounded-lg bg-green-500 px-4 py-2 shadow-lg hover:bg-green-600"
          >
            <FaPlusCircle />
            Add
          </button>
        </div>

        {/* Ingredients List */}
        <ul className="mb-6">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="mb-2 flex items-center justify-between rounded-lg bg-gray-800 p-3 shadow"
            >
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>

        {/* Calculate Nutrients Button */}
        <button
          onClick={calculateNutrients}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-lg font-bold shadow-lg hover:bg-blue-600"
        >
          <FaFire />
          Calculate Nutrients
        </button>

        {/* Nutrient Data Section */}
        {nutrientData && (
          <div className="mt-8">
            <h2 className="mb-4 text-center text-lg font-semibold md:text-xl lg:text-2xl">
              Total Nutrients
            </h2>
            {totalNutrientsRef.current && (
              <NutrientItem data={totalNutrientsRef.current} />
            )}
            <h2 className="mb-4 text-center text-2xl font-semibold">
              Nutrient Breakdown
            </h2>
            {nutrientData.map((data, index) => (
              <NutrientItem data={data} key={index} />
            ))}
          </div>
        )}

        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default CheckNutrients;

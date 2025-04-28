import { useEffect, useState } from "react";
import FilterSection from "../../ui/FilterSection.jsx";
import useGetAllRecipes from "../../services/recipe/getAllRecipes.js";
import RecipeItem from "./RecipeItem.jsx"; // Import the RecipeItem component
import { useSocket } from "../../services/socketContext.jsx"; // Import useSocket hook
import Loading from "../../ui/Loading.jsx";

function ShowRecipes() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    caloriesMin: "",
    caloriesMax: "",
    proteinMin: "",
    proteinMax: "",
    fatMin: "",
    fatMax: "",
    carbsMin: "",
    carbsMax: "",
    cookingTimeMin: "",
    cookingTimeMax: "",
    preparationTimeMin: "",
    preparationTimeMax: "",
    ingredients: "",
    cuisineType: "",
    sortBy: "",
  });

  const { isLoading, allRecipes, refetch } = useGetAllRecipes(filters); // Fetch recipes with filters

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update filters state when filter is applied
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle visibility of the filter section
  };

  const { socket } = useSocket();

  useEffect(() => {
    const handleRecipeCreated = (newRecipe) => {
      refetch();
    };

    if (socket) {
      socket.on("recipeCreated", handleRecipeCreated);
    }

    // Cleanup listener when component unmounts
    return () => {
      if (socket) {
        socket.off("recipeCreated", handleRecipeCreated);
      }
    };
  }, [socket, refetch]);

  return (
    // <h1>Test</h1>
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <button
          onClick={toggleFilterVisibility}
          className="text-blue-500 hover:text-blue-700"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div
        className={`custom-scrollbar overflow-scroll transition-all duration-300 ease-in-out ${
          isFilterVisible
            ? "mx-auto mb-8 max-h-[500px] max-w-[800px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <FilterSection onFilterChange={handleFilterChange} />
      </div>

      {/* Recipes List */}
      {isLoading ? (
        <Loading />
      ) : allRecipes.data.recipes.length === 0 ? (
        <div>
          <div className="flex h-[50vh] items-center justify-center text-xl font-bold text-white">
            No recipes found.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allRecipes.data.recipes.map((recipe) => (
            <RecipeItem key={recipe.id} data={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowRecipes;

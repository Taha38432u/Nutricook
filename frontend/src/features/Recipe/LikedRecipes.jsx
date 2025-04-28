import { useState } from "react";
import FilterSection from "../../ui/FilterSection.jsx";
import LikedRecipeItem from "./LikedRecipeItem.jsx";
import useGetLikedRecipes from "../../services/recipe/useGetLikedRecipes.js";
import Loading from "../../ui/Loading.jsx";

function ShowLikedRecipes() {
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

  const { isLoading, likedRecipes } = useGetLikedRecipes(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const recipes = likedRecipes?.data.recipes || [];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <button
          onClick={toggleFilterVisibility}
          className="text-blue-500 hover:text-blue-700"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isFilterVisible && <FilterSection onFilterChange={handleFilterChange} />}

      {isLoading ? (
        <Loading />
      ) : recipes.length === 0 ? (
        <div>
          <div className="flex h-[50vh] items-center justify-center text-xl text-white font-bold">
            No liked recipes found.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <LikedRecipeItem key={recipe.id} data={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowLikedRecipes;

import axios from "axios";
import { API_URL } from "../authentication/apiAuth.js";

export async function createRecipe({ recipeData, id }) {
  // console.log(id);

  // if (id === "") {
  //   return;
  // }
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  let response;

  if (id !== "") {
    try {
      response = await axios.patch(
        `${API_URL}api/v1/recipes/${id}`,
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token for authentication
          },
        },
      );

      return response.data; // Assuming the response contains the created recipe
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update recipe",
      );
    }
  } else {
    try {
      response = await axios.post(`${API_URL}api/v1/recipes/`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token for authentication
        },
      });

      return response.data; // Assuming the response contains the created recipe
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create recipe",
      );
    }
  }
}

export async function getNutrients(ingredients) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    const response = await axios.post(
      `${API_URL}api/v1/recipes/nutrients`,
      ingredients,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token for authentication
        },
      },
    );

    return response.data; // Assuming the response contains the nutrients data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get nutrients");
  }
}

export async function getAllRecipes(filters) {
  const params = new URLSearchParams();

  // Check if the filter object has any keys with values
  const hasFilters = Object.values(filters).some((value) => value);

  if (hasFilters) {
    // Add ranges (min/max) only if they exist
    if (filters.caloriesMin)
      params.append("calories[gte]", filters.caloriesMin);
    if (filters.caloriesMax)
      params.append("calories[lte]", filters.caloriesMax);

    if (filters.proteinMin) params.append("protein[gte]", filters.proteinMin);
    if (filters.proteinMax) params.append("protein[lte]", filters.proteinMax);

    if (filters.fatMin) params.append("fat[gte]", filters.fatMin);
    if (filters.fatMax) params.append("fat[lte]", filters.fatMax);

    if (filters.carbsMin) params.append("carbohydrates[gte]", filters.carbsMin);
    if (filters.carbsMax) params.append("carbohydrates[lte]", filters.carbsMax);

    if (filters.cookingTimeMin)
      params.append("cookingTime[gte]", filters.cookingTimeMin);
    if (filters.cookingTimeMax)
      params.append("cookingTime[lte]", filters.cookingTimeMax);

    if (filters.preparationTimeMin)
      params.append("preparationTime[gte]", filters.preparationTimeMin);
    if (filters.preparationTimeMax)
      params.append("preparationTime[lte]", filters.preparationTimeMax);

    // Add other direct filters
    if (filters.ingredients) params.append("ingredients", filters.ingredients);
    if (filters.cuisineType) params.append("cuisine", filters.cuisineType);

    // Add sorting logic
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "likesAsc":
          params.append("sort", "likes:asc");
          break;
        case "likesDesc":
          params.append("sort", "likes:desc");
          break;
        case "dateAsc":
          params.append("sort", "createdAt:asc");
          break;
        case "dateDesc":
          params.append("sort", "createdAt:desc");
          break;
        default:
          break;
      }
    }
  }

  // Construct the URL
  const baseUrl = `${API_URL}api/v1/recipes/`;
  const url = hasFilters ? `${baseUrl}?${params.toString()}` : baseUrl;

  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the GET request to the API
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token for authentication
      },
    });

    // console.log(response.data);
    return response.data; // Assuming the response contains the recipes data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get recipes");
  }
}

export async function getMyRecipes(filters) {
  const params = new URLSearchParams();

  // Check if the filter object has any keys with values
  const hasFilters = Object.values(filters).some((value) => value);

  if (hasFilters) {
    // Add ranges (min/max) only if they exist
    if (filters.caloriesMin)
      params.append("calories[gte]", filters.caloriesMin);
    if (filters.caloriesMax)
      params.append("calories[lte]", filters.caloriesMax);

    if (filters.proteinMin) params.append("protein[gte]", filters.proteinMin);
    if (filters.proteinMax) params.append("protein[lte]", filters.proteinMax);

    if (filters.fatMin) params.append("fat[gte]", filters.fatMin);
    if (filters.fatMax) params.append("fat[lte]", filters.fatMax);

    if (filters.carbsMin) params.append("carbohydrates[gte]", filters.carbsMin);
    if (filters.carbsMax) params.append("carbohydrates[lte]", filters.carbsMax);

    if (filters.cookingTimeMin)
      params.append("cookingTime[gte]", filters.cookingTimeMin);
    if (filters.cookingTimeMax)
      params.append("cookingTime[lte]", filters.cookingTimeMax);

    if (filters.preparationTimeMin)
      params.append("preparationTime[gte]", filters.preparationTimeMin);
    if (filters.preparationTimeMax)
      params.append("preparationTime[lte]", filters.preparationTimeMax);

    // Add other direct filters
    if (filters.ingredients) params.append("ingredients", filters.ingredients);
    if (filters.cuisineType) params.append("cuisine", filters.cuisineType);

    // Add sorting logic
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "likesAsc":
          params.append("sort", "likes:asc");
          break;
        case "likesDesc":
          params.append("sort", "likes:desc");
          break;
        case "dateAsc":
          params.append("sort", "createdAt:asc");
          break;
        case "dateDesc":
          params.append("sort", "createdAt:desc");
          break;
        default:
          break;
      }
    }
  }

  // Construct the URL
  const baseUrl = `${API_URL}api/v1/recipes/me`;
  const url = hasFilters ? `${baseUrl}?${params.toString()}` : baseUrl;

  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the GET request to the API
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token for authentication
      },
    });

    // console.log(response.data);
    return response.data; // Assuming the response contains the recipes data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get recipes");
  }
}

export async function getAllRecipesAdmin(filters) {
  const params = new URLSearchParams();

  // Check if the filter object has any keys with values
  const hasFilters = Object.values(filters).some((value) => value);

  if (hasFilters) {
    // Add ranges (min/max) only if they exist
    if (filters.caloriesMin)
      params.append("calories[gte]", filters.caloriesMin);
    if (filters.caloriesMax)
      params.append("calories[lte]", filters.caloriesMax);

    if (filters.proteinMin) params.append("protein[gte]", filters.proteinMin);
    if (filters.proteinMax) params.append("protein[lte]", filters.proteinMax);

    if (filters.fatMin) params.append("fat[gte]", filters.fatMin);
    if (filters.fatMax) params.append("fat[lte]", filters.fatMax);

    if (filters.carbsMin) params.append("carbohydrates[gte]", filters.carbsMin);
    if (filters.carbsMax) params.append("carbohydrates[lte]", filters.carbsMax);

    if (filters.cookingTimeMin)
      params.append("cookingTime[gte]", filters.cookingTimeMin);
    if (filters.cookingTimeMax)
      params.append("cookingTime[lte]", filters.cookingTimeMax);

    if (filters.preparationTimeMin)
      params.append("preparationTime[gte]", filters.preparationTimeMin);
    if (filters.preparationTimeMax)
      params.append("preparationTime[lte]", filters.preparationTimeMax);

    // Add other direct filters
    if (filters.ingredients) params.append("ingredients", filters.ingredients);
    if (filters.cuisineType) params.append("cuisine", filters.cuisineType);

    // Add sorting logic
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "likesAsc":
          params.append("sort", "likes:asc");
          break;
        case "likesDesc":
          params.append("sort", "likes:desc");
          break;
        case "dateAsc":
          params.append("sort", "createdAt:asc");
          break;
        case "dateDesc":
          params.append("sort", "createdAt:desc");
          break;
        default:
          break;
      }
    }
  }

  // Construct the URL
  const baseUrl = `${API_URL}api/v1/recipes/all`;
  const url = hasFilters ? `${baseUrl}?${params.toString()}` : baseUrl;

  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the GET request to the API
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token for authentication
      },
    });

    return response.data; // Assuming the response contains the recipes data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get recipes");
  }
}

export async function getLikedRecipes(filters) {
  const params = new URLSearchParams();

  // Check if the filter object has any keys with values
  const hasFilters = Object.values(filters).some((value) => value);

  if (hasFilters) {
    // Add ranges (min/max) only if they exist
    if (filters.caloriesMin)
      params.append("calories[gte]", filters.caloriesMin);
    if (filters.caloriesMax)
      params.append("calories[lte]", filters.caloriesMax);

    if (filters.proteinMin) params.append("protein[gte]", filters.proteinMin);
    if (filters.proteinMax) params.append("protein[lte]", filters.proteinMax);

    if (filters.fatMin) params.append("fat[gte]", filters.fatMin);
    if (filters.fatMax) params.append("fat[lte]", filters.fatMax);

    if (filters.carbsMin) params.append("carbohydrates[gte]", filters.carbsMin);
    if (filters.carbsMax) params.append("carbohydrates[lte]", filters.carbsMax);

    if (filters.cookingTimeMin)
      params.append("cookingTime[gte]", filters.cookingTimeMin);
    if (filters.cookingTimeMax)
      params.append("cookingTime[lte]", filters.cookingTimeMax);

    if (filters.preparationTimeMin)
      params.append("preparationTime[gte]", filters.preparationTimeMin);
    if (filters.preparationTimeMax)
      params.append("preparationTime[lte]", filters.preparationTimeMax);

    // Add other direct filters
    if (filters.ingredients) params.append("ingredients", filters.ingredients);
    if (filters.cuisineType) params.append("cuisine", filters.cuisineType);

    // Add sorting logic
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "likesAsc":
          params.append("sort", "likes:asc");
          break;
        case "likesDesc":
          params.append("sort", "likes:desc");
          break;
        case "dateAsc":
          params.append("sort", "createdAt:asc");
          break;
        case "dateDesc":
          params.append("sort", "createdAt:desc");
          break;
        default:
          break;
      }
    }
  }

  // Construct the URL
  const baseUrl = `${API_URL}api/v1/recipes/likedRecipes`;
  const url = hasFilters ? `${baseUrl}?${params.toString()}` : baseUrl;
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to get liked recipes");
  }
}

export async function getSingleRecipe(id) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the GET request to fetch the recipe by ID
    const response = await axios.get(`${API_URL}api/v1/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token for authentication
      },
    });

    return response.data; // Assuming the response contains the recipe details
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get the recipe",
    );
  }
}

export async function toggleLike(id) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the PATCH request to toggle the like
    const response = await axios.patch(
      `${API_URL}api/v1/recipes/like/${id}`,
      {}, // Pass an empty object as the request body if no body is required
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token for authentication
        },
      },
    );

    return response.data; // Assuming the response contains the updated recipe data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to toggle like on the recipe",
    );
  }
}

// Delete Recipe
export async function deleteRecipe({ id }) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    // Make the PATCH request to toggle the like
    const response = await axios.delete(`${API_URL}api/v1/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token for authentication
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete recipe");
  }
}

export async function getAllUsers() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Not logged in");
  }
  try {
    const response = await axios.get(`${API_URL}api/v1/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get users");
  }
}

import { FaUsers, FaUserPlus, FaUtensils, FaCalendarAlt } from "react-icons/fa";
import MainHeading from "../ui/MainHeading.jsx";
import useGetAllUsers from "../services/authentication/useGetAllUsers.js";
import Loading from "../ui/Loading.jsx";
import useGetAllRecipesAdmin from "../services/recipe/useGetAllRecipesAdmin.js";

function Dashboard() {
  const { isLoading, users } = useGetAllUsers();
  const filters = {};
  const { isLoading: isLoadingRecipes, allRecipes } =
    useGetAllRecipesAdmin(filters);

  if (isLoading || isLoadingRecipes) return <Loading />;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const newUsersThisMonth = users.data.users.filter((user) => {
    const createdAtDate = new Date(user.createdAt);
    return (
      createdAtDate.getMonth() === currentMonth &&
      createdAtDate.getFullYear() === currentYear
    );
  });

  const newRecipesThisMonth = allRecipes.data.recipes.filter((recipe) => {
    const createdAtDate = new Date(recipe.createdAt);
    return (
      createdAtDate.getMonth() === currentMonth &&
      createdAtDate.getFullYear() === currentYear
    );
  });

  return (
    <>
      <MainHeading content="Dashboard" />

      {/* Users Section */}
      <div className="mt-8">
        <h2 className="text-4xl font-bold text-gray-100">Users</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <FaUsers className="text-4xl text-white" />
              <p className="text-3xl font-bold text-white">{users.results}</p>
            </div>
            <p className="mt-2 text-white">Total Users</p>
          </div>

          {/* Users This Month */}
          <div className="rounded-lg bg-gradient-to-r from-teal-400 to-green-500 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <FaUserPlus className="text-4xl text-white" />
              <p className="text-3xl font-bold text-white">
                {newUsersThisMonth.length}
              </p>
            </div>
            <p className="mt-2 text-white">New Users This Month</p>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="mb-12 mt-12">
        <h2 className="text-4xl font-bold text-gray-100">Recipes</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Recipes */}
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <FaUtensils className="text-4xl text-white" />
              <p className="text-3xl font-bold text-white">
                {allRecipes.results}
              </p>
            </div>
            <p className="mt-2 text-white">Total Recipes</p>
          </div>

          {/* Recipes This Month */}
          <div className="rounded-lg bg-gradient-to-r from-orange-400 to-red-500 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <FaCalendarAlt className="text-4xl text-white" />
              <p className="text-3xl font-bold text-white">
                {newRecipesThisMonth.length}
              </p>
            </div>
            <p className="mt-2 text-white">New Recipes This Month</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

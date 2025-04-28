import MainHeading from "../ui/MainHeading.jsx";
import ShowRecipeDetail from "../features/Recipe/ShowRecipeDetail.jsx";

function SingleRecipe() {
  return (
    <>
      <MainHeading content={"Recipe Detail"} />
      <ShowRecipeDetail />
    </>
  );
}

export default SingleRecipe;

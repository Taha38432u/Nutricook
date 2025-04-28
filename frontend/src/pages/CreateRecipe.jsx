import MainHeading from "../ui/MainHeading.jsx";
import CreateRecipeForm from "../features/Recipe/CreateRecipeForm.jsx";

function CreateRecipe() {
  return (
    <>
      <MainHeading content="Create Recipe" />
      <CreateRecipeForm />
    </>
  );
}

export default CreateRecipe;

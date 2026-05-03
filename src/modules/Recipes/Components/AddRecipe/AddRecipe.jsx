import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRecipeForm from "../../../../hooks/useRecipeForm";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";

export default function AddRecipe() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { categoriesList, tagsList, setImageFile, createRecipe, loading } =
    useRecipeForm(() => navigate("/dashboard/recipes"));

  const onSubmit = async (data) => {
    await createRecipe(data);
  };

  return (
    <>
      <RecipeHeader />
      <div className="container-fluid">
        <div className="m-3">
          <h5 className="text-muted">Add New Recipe</h5>
          <div className="form-container">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-75 m-auto p-3 mt-5"
            >
              <RecipeForm
                register={register}
                errors={errors}
                categoriesList={categoriesList}
                tagsList={tagsList}
                setImageFile={setImageFile}
              />
              <div className="btns d-flex gap-4 justify-content-end">
                {!loading && (
                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate("/dashboard/recipes")}
                  >
                    Cancel
                  </button>
                )}
                <button className="btn btn-success" disabled={loading}>
                  {loading ? "Saving...." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

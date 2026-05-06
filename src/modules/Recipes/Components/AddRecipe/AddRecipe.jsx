import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useRecipeForm from "../../../../hooks/useRecipeForm";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipeHeader from "../../../Shared/Components/RecipeHeader/RecipeHeader";
import { useEffect, useState } from "react";
import { RecipesAPI } from "../../../../api";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [oldImage, setOldImage] = useState(null);
  const { id } = useParams();
  const isEdit = !!id;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {
    categoriesList,
    tagsList,
    setImageFile,
    createRecipe,
    updateRecipe,
    loading,
  } = useRecipeForm(() => navigate("/dashboard/recipes"));

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateRecipe(id, data, oldImage);
    } else {
      await createRecipe(data);
    }
  };

  useEffect(() => {
    if (!id) return;

    const getRecipe = async () => {
      try {
        const response = await RecipesAPI.getRecipeById(id);

        const recipe = response.data;

        reset({
          name: recipe.name,
          price: recipe.price,
          description: recipe.description,
          categoriesIds: recipe.category[0].id,
          tagId: recipe.tag.id,
        });
        setImagePreview(
          `https://upskilling-egypt.com:3006/${recipe.imagePath}`,
        );
        setOldImage(recipe.imagePath);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipe();
  }, [id, reset]);

  return (
    <>
      <RecipeHeader />
      <div className="container-fluid">
        <div className="m-3">
          <h5 className="text-muted">
            {isEdit ? "Edit Recipe" : "Add New Recipe"}
          </h5>
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
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
              <div className="btns d-flex gap-4 justify-content-end">
                {!loading && (
                  <button
                    type="button"
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

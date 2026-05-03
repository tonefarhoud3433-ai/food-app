import { useEffect, useState } from "react";
import { CategoriesAPI, RecipesAPI, TagsAPI } from "../api";
import { showError, showSuccess } from "../utils/toastConfig";

export default function useRecipeForm(onSuccess) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTags = async () => {
    try {
      const response = await TagsAPI.getTags();
      setTagsList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
    getTags();
  }, []);

  const createRecipe = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", imageFile);

    setLoading(true);

    try {
      const response = await RecipesAPI.createRecipe(formData);
      const message =
        response?.data?.message || `${data.name} created successfully`;
      showSuccess(message);
      onSuccess?.();
      return true;
    } catch (error) {
      const message = error.response?.data?.message || `Something went wrong`;
      showError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    categoriesList,
    tagsList,
    setImageFile,
    createRecipe,
    loading,
  };
}

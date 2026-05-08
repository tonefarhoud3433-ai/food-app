import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriesAPI, FavsAPI, RecipesAPI, TagsAPI } from "../../../../api";
import headerRecipes from "../../../../assets/images/common/headerAllSections.png";
import noDataImage from "../../../../assets/images/common/no-data.png";
import { AuthContext } from "../../../../context/AuthContext";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import { showError, showSuccess } from "../../../../utils/toastConfig";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import FilterBar from "../../../Shared/Components/FilterBar/FilterBar";
import Header from "../../../Shared/Components/Header/Header";
import ItemViewModal from "../../../Shared/Components/ItemViewModal/ItemViewModal";
import NoData from "../../../Shared/Components/NoData/NoData";
import Pagination from "../../../Shared/Components/Pagination/Pagination";

export default function RecipesList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [filters, setFilters] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });

  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  const [showView, setShowView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentFavs, setCurrentFavs] = useState([]); // تخزين المفضلات يدوياً

  // دالة لجلب المفضلات بشكل يدوي لتجنب الخطأ للأدمن
  const getUserFavs = async () => {
    try {
      const response = await FavsAPI.getFavs();
      setCurrentFavs(response.data.data);
    } catch (error) {
      console.error("Could not fetch favorites", error);
    }
  };

  // تشغيل جلب المفضلات فقط إذا كان المستخدم SystemUser
  useEffect(() => {
    if (loginData?.userGroup === "SystemUser") {
      getUserFavs();
    }
  }, [loginData]);

  const handleView = (item) => {
    setSelectedRecipe(item);
    setShowView(true);
  };

  const addToFavoriteFunction = async (id) => {
    // التحقق مما إذا كانت الوصفة موجودة بالفعل في قائمة المفضلات الحالية
    const isAlreadyFav = currentFavs?.some((fav) => fav.recipe.id === id);

    if (isAlreadyFav) {
      showError("This recipe is already in your favorites!");
      return;
    }

    try {
      const response = await FavsAPI.createFavs({ recipeId: id });
      showSuccess(response.data?.message || "Added to favorites successfully!");
      navigate("/dashboard/favorites");
    } catch (error) {
      showError(error.response?.data?.message || "Failed to add to favorites!");
    }
  };

  const { show, selectedItem, open, close } = useDeleteModal();

  const {
    data: recipesList,
    refetch,
    totalPages,
  } = useFetchList(RecipesAPI.getRecipes, {
    pageNumber,
    pageSize,
    name: filters.name,
    tagId: filters.tagId,
    categoryId: filters.categoryId,
  });

  const { deleteItem, deletingId } = useDeleteItem(
    RecipesAPI.deleteRecipe,
    refetch,
  );

  const { data: tagsList } = useFetchList(TagsAPI.getTags, {
    pageSize: 100,
  });

  const { data: categoriesList } = useFetchList(CategoriesAPI.getCategories, {
    pageSize: 100,
  });

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "recipeImage",
      label: "Image",
      render: (item) => (
        <img
          src={`https://upskilling-egypt.com:3006/${item?.imagePath}`}
          alt="recipe"
          onError={(e) => (e.target.src = noDataImage)}
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      ),
    },
    { key: "price", label: "Price" },
    { key: "description", label: "Description" },
    { key: "tag", label: "Tag", render: (item) => item?.tag?.name },
    {
      key: "Category",
      label: "Category",
      render: (item) => item?.category?.[0]?.name || "-",
    },
  ];

  useEffect(() => {
    if (recipesList?.length === 0 && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  }, [recipesList, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [filters]);

  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Recipes</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerRecipes}
      />

      <ItemViewModal
        show={showView}
        handleClose={() => setShowView(false)}
        data={selectedRecipe}
        title="Recipe Details"
        // نمرر دالة الإضافة فقط إذا كان المستخدم SystemUser
        onAddToFav={
          loginData?.userGroup === "SystemUser" ? addToFavoriteFunction : null
        }
      />

      <DeleteConfirmation
        show={show}
        onClose={close}
        onConfirm={() => {
          if (!selectedItem) return;
          deleteItem(selectedItem);
          close();
        }}
        itemName={selectedItem?.name}
        entityName="Recipe"
      />

      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>Recipe Table Details</h4>
          <p>You can check all details </p>
        </div>
        {loginData?.userGroup !== "SystemUser" && (
          <button
            className="btn btn-success add-btn"
            onClick={() => navigate("add-recipe")}
          >
            Add New Recipe
          </button>
        )}
      </div>

      <FilterBar
        setFilters={setFilters}
        tagsList={tagsList}
        categoriesList={categoriesList}
        showExtraFilters={true}
      />

      <div className="table-container m-3">
        {recipesList?.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={recipesList}
              onDelete={deleteItem}
              deletingId={deletingId}
              onShow={open}
              onEdit={(item) => navigate(`edit-recipe/${item.id}`)}
              onView={handleView}
            />
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={totalPages}
            />
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}

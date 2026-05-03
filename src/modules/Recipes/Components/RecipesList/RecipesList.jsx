import { useNavigate } from "react-router-dom";
import { RecipesAPI } from "../../../../api";
import headerRecipes from "../../../../assets/images/common/headerAllSections.png";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";
import noDataImage from "../../../../assets/images/common/no-data.png";

export default function RecipesList() {
  const navigate = useNavigate();

  const { show, selectedItem, open, close } = useDeleteModal();

  const { data: recipesList, refetch } = useFetchList(RecipesAPI.getRecipes);

  const { deleteItem, deletingId } = useDeleteItem(
    RecipesAPI.deleteRecipe,
    refetch,
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    {
      key: "recipeImage",
      label: "Image",
      render: (item) => (
        <img
          src={`https://upskilling-egypt.com:3006/${item?.imagePath}`}
          alt="recipe image"
          onError={(e) => (e.target.src = noDataImage)}
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      ),
    },
    {
      key: "creationDate",
      label: "Date",
      render: (item) =>
        item?.creationDate
          ? new Date(item.creationDate).toLocaleDateString()
          : "-",
    },
    { key: "category", label: "Category", render: (item) => item?.tag?.name },
    { key: "price", label: "Price" },
  ];

  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Recipes</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerRecipes}
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
        <button
          className="btn btn-success add-btn"
          onClick={() => navigate("add-recipe")}
        >
          Add New Recipe
        </button>
      </div>
      <div className="table-container m-3">
        {recipesList?.length > 0 ? (
          <DataTable
            columns={columns}
            data={recipesList}
            onDelete={deleteItem}
            deletingId={deletingId}
            onShow={open}
          />
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}

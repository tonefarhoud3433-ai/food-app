import { RecipesAPI } from "../../../../api";
import headerRecipes from "../../../../assets/images/common/headerAllSections.png";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";

export default function RecipesList() {
  const { show, selectedItem, open, close } = useDeleteModal();

  const {
    data: recipesList,
    loading,
    setData,
  } = useFetchList(RecipesAPI.getRecipes);

  const { deleteItem, deletingId } = useDeleteItem(
    RecipesAPI.deleteRecipe,
    (id) => {
      setData((prev) => prev.filter((item) => item.id !== id));
    },
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    { key: "creationDate", label: "Date" },
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
          deleteItem(selectedItem.id);
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
        <button className="btn btn-success add-btn">Add New Item</button>
      </div>
      <div className="table-container m-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <span className="spinner-border spinner-border-sm me-2 text-success"></span>
          </div>
        ) : recipesList?.length > 0 ? (
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

import { CategoriesAPI } from "../../../../api";
import headerCateges from "../../../../assets/images/common/headerAllSections.png";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";

export default function CategoriesList() {
  const { show, selectedItem, open, close } = useDeleteModal();

  const {
    data: categoriesList,
    loading,
    refetch,
  } = useFetchList(CategoriesAPI.getCategories);

  const { deleteItem, deletingId } = useDeleteItem(
    CategoriesAPI.deleteCategory,
    refetch,
    // (id) => {
    //   setData((prev) => prev.filter((item) => item.id !== id));
    // },
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    { key: "creationDate", label: "Creation Date" },
  ];

  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Categories</span>{" "}
            <span className="fw-normal">Items</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerCateges}
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
        entityName="Category"
      />
      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <p>You can check all details </p>
        </div>
        <button className="btn btn-success add-btn">Add New Category</button>
      </div>
      <div className="m-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <span className="spinner-border spinner-border-sm me-2 text-success"></span>
          </div>
        ) : categoriesList?.length > 0 ? (
          <DataTable
            columns={columns}
            data={categoriesList}
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

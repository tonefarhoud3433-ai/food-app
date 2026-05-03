import { useState } from "react";
import { useForm } from "react-hook-form";
import { CategoriesAPI } from "../../../../api";
import headerCateges from "../../../../assets/images/common/headerAllSections.png";
import useCreateItem from "../../../../hooks/useCreateItem";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import AddModal from "../../../Shared/Components/AddModal/AddModal";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";

export default function CategoriesList() {
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { show, selectedItem, open, close } = useDeleteModal();

  const { data: categoriesList, refetch } = useFetchList(
    CategoriesAPI.getCategories,
  );

  const { deleteItem, deletingId } = useDeleteItem(
    CategoriesAPI.deleteCategory,
    refetch,
    // (id) => {
    //   setData((prev) => prev.filter((item) => item.id !== id));
    // },
  );

  const { createItem, loading } = useCreateItem(
    CategoriesAPI.createCategory,
    refetch,
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    {
      key: "creationDate",
      label: "Creation Date",
      render: (item) =>
        item?.creationDate
          ? new Date(item.creationDate).toLocaleDateString()
          : "-",
    },
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
          deleteItem(selectedItem);
          close();
        }}
        itemName={selectedItem?.name}
        entityName="Category"
      />

      <AddModal
        showAdd={showAdd}
        handleAddClose={handleAddClose}
        title="Category"
        handleSubmit={handleSubmit}
        onSubmit={async (data) => {
          const success = await createItem(data);
          if (success) handleAddClose();
          reset();
        }}
        loading={loading}
      >
        <div className="input-group my-2">
          <input
            {...register("name", { required: "Category Name is Required" })}
            type="text"
            className="form-control"
            placeholder="Category Name"
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </AddModal>

      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <p>You can check all details </p>
        </div>
        <button onClick={handleAddShow} className="btn btn-success add-btn">
          Add New Category
        </button>
      </div>
      <div className="m-3">
        {categoriesList?.length > 0 ? (
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

import { useEffect, useState } from "react";
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
import useUpdateItem from "../../../../hooks/useUpdateItem";
import Pagination from "../../../Shared/Components/Pagination/Pagination";
import FilterBar from "../../../Shared/Components/FilterBar/FilterBar";

export default function CategoriesList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [filters, setFilters] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => {
    setEditingItem(null);
    reset({ name: "" });
    setShowAdd(true);
  };
  const handleEditShow = (item) => {
    setEditingItem(item);
    reset({ name: item.name });
    setShowAdd(true);
  };

  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { show, selectedItem, open, close } = useDeleteModal();

  const {
    data: categoriesList,
    refetch,
    totalPages,
  } = useFetchList(CategoriesAPI.getCategories, {
    pageNumber,
    pageSize,
    name: filters.name,
  });

  const { deleteItem, deletingId } = useDeleteItem(
    CategoriesAPI.deleteCategory,
    refetch,
  );

  const { createItem, loading } = useCreateItem(
    CategoriesAPI.createCategory,
    refetch,
  );

  const {
    updateItem,
    loading: updateLoading,
    updatingId,
  } = useUpdateItem(CategoriesAPI.updateCategory, refetch);

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
  useEffect(() => {
    if (categoriesList?.length === 0 && pageNumber > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageNumber((prev) => prev - 1);
    }
  }, [categoriesList, pageNumber]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageNumber(1);
  }, [filters]);

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
          let success;

          if (editingItem) {
            success = await updateItem(editingItem?.id, data);
          } else {
            success = await createItem(data);
          }

          if (success) {
            handleAddClose();
            setEditingItem(null);
            reset();
          }
        }}
        loading={loading || updateLoading}
        editingItem={editingItem}
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
      <FilterBar setFilters={setFilters} />
      <div className="m-3">
        {categoriesList?.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={categoriesList}
              onDelete={deleteItem}
              deletingId={deletingId}
              onShow={open}
              onEdit={handleEditShow}
              updatingId={updatingId}
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

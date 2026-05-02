import { useState } from "react";
import { UsersAPI } from "../../../../api";
import headerUsers from "../../../../assets/images/common/headerAllSections.png";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useFetchList from "../../../../hooks/useFetchList";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";

export default function UsersList() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };
  const { data: usersList, loading, setData } = useFetchList(UsersAPI.getUsers);

  const { deleteItem, deletingId } = useDeleteItem(
    UsersAPI.deleteUser,
    (id) => {
      setData((prev) => prev.filter((item) => item.id !== id));
    },
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "userName", label: "Name" },
    { key: "country", label: "Country" },
  ];
  return (
    <>
      <Header
        title={
          <>
            <span className="fw-bold">Users</span>{" "}
            <span className="fw-normal">List</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerUsers}
      />

      <DeleteConfirmation
        show={show}
        onClose={handleClose}
        onConfirm={() => {
          if (!selectedItem) return;
          deleteItem(selectedItem.id);
          handleClose();
        }}
        itemName={selectedItem?.userName}
        entityName="User"
        loading={deletingId === selectedItem}
      />

      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>User Table Details</h4>
          <p>You can check all details </p>
        </div>
      </div>
      <div className="table-container m-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <span className="spinner-border spinner-border-sm me-2 text-success"></span>
          </div>
        ) : usersList?.length > 0 ? (
          <DataTable
            columns={columns}
            data={usersList}
            onDelete={deleteItem}
            deletingId={deletingId}
            onShow={handleShow}
          />
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}

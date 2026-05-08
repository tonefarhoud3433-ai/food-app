import { useEffect, useState } from "react";
import { UsersAPI } from "../../../../api";
import headerUsers from "../../../../assets/images/common/headerAllSections.png";
import useDeleteItem from "../../../../hooks/useDeleteItem";
import useDeleteModal from "../../../../hooks/useDeleteModal";
import useFetchList from "../../../../hooks/useFetchList";
import DataTable from "../../../Shared/Components/DataTable/DataTable";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";
import Pagination from "../../../Shared/Components/Pagination/Pagination";
import FilterBar from "../../../Shared/Components/FilterBar/FilterBar";

export default function UsersList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [filters, setFilters] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });

  const { show, selectedItem, open, close } = useDeleteModal();

  const {
    data: usersList,
    refetch,
    totalPages,
  } = useFetchList(UsersAPI.getUsers, {
    pageNumber,
    pageSize,
    userName: filters.name,
  });

  const { deleteItem, deletingId } = useDeleteItem(
    UsersAPI.deleteUser,
    refetch,
  );

  const columns = [
    { key: "id", label: "#" },
    { key: "userName", label: "Name" },
    { key: "country", label: "Country" },
  ];

  useEffect(() => {
    if (usersList?.length === 0 && pageNumber > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageNumber((prev) => prev - 1);
    }
  }, [usersList, pageNumber]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageNumber(1);
  }, [filters]);

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
        onClose={close}
        onConfirm={() => {
          if (!selectedItem) return;
          deleteItem(selectedItem);
          close();
        }}
        itemName={selectedItem?.userName}
        entityName="User"
      />

      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>User Table Details</h4>
          <p>You can check all details </p>
        </div>
      </div>
      <FilterBar setFilters={setFilters} />
      <div className="table-container m-3">
        {usersList?.length > 0 ? (
          <>
            <DataTable
              columns={columns}
              data={usersList}
              onDelete={deleteItem}
              deletingId={deletingId}
              onShow={open}
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

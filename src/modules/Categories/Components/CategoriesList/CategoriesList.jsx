import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CategoriesAPI } from "../../../../api";
import headerCateges from "../../../../assets/images/common/headerAllSections.png";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";
import { Table } from "react-bootstrap";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);

  const getCategoriesList = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategoriesList(response?.data?.data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await CategoriesAPI.deleteCategory(id);
      getCategoriesList();
      toast.success(response?.data?.message);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategoriesList();
  }, []);

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
      <div className="px-4 py-3 m-3 rounded rounded-4 d-flex justify-content-between align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <p>You can check all details </p>
        </div>
        <button className="btn btn-success add-btn">Add New Category</button>
      </div>
      <div className="m-3">
        {categoriesList.length > 0 ? (
          <Table hover>
            <thead className="table-header-style">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-2"
                      style={{ cursor: "pointer" }}
                    ></i>
                    <i
                      onClick={() => deleteCategory(item.id)}
                      className="fa fa-trash text-danger"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}

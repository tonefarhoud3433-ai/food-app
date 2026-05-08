import { Table, Dropdown } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

export default function DataTable({
  columns,
  data,
  onDelete,
  onShow,
  deletingId,
  onEdit,
  updatingId,
  onView,
}) {
  const { loginData } = useContext(AuthContext);
  const isAdmin = loginData?.userGroup === "SuperAdmin";

  return (
    <>
      <Table hover responsive>
        <thead className="table-header-style">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key} className="align-middle">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              <td className="align-middle text-center">
                {deletingId === item.id || updatingId === item.id ? (
                  <span className="spinner-border spinner-border-sm text-success"></span>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id={`dropdown-${item.id}`}
                      className="text-dark p-0 border-0 shadow-none no-caret"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-sm border-0">
                      {!isAdmin ? (
                        <Dropdown.Item
                          onClick={() => onView(item)}
                          className="py-2"
                        >
                          <i className="fa-regular fa-eye me-2 text-success"></i>{" "}
                          View
                        </Dropdown.Item>
                      ) : (
                        <>
                          {onEdit && (
                            <Dropdown.Item
                              onClick={() => onEdit(item)}
                              className="py-2 text-warning"
                            >
                              <i className="fa-regular fa-pen-to-square me-2"></i>{" "}
                              Edit
                            </Dropdown.Item>
                          )}
                          {onDelete && (
                            <Dropdown.Item
                              onClick={() => onShow(item)}
                              className="py-2 text-danger"
                            >
                              <i className="fa-regular fa-trash-can me-2"></i>{" "}
                              Delete
                            </Dropdown.Item>
                          )}
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

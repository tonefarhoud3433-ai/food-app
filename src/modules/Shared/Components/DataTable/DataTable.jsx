import { Table } from "react-bootstrap";

export default function DataTable({
  columns,
  data,
  onDelete,
  onShow,
  deletingId,
  onEdit,
  updatingId,
}) {
  return (
    <>
      <Table hover responsive>
        <thead className="table-header-style">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {onDelete && <th>Actions</th>}
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
              {onDelete && (
                <td className="align-middle">
                  {deletingId === item.id ? (
                    <span className="spinner-border spinner-border-sm text-danger"></span>
                  ) : (
                    <>
                      {updatingId === item.id ? (
                        <span className="spinner-border spinner-border-sm text-warning mx-2"></span>
                      ) : (
                        <i
                          onClick={() => onEdit(item)}
                          className="fa fa-edit text-warning mx-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                      )}

                      <i
                        onClick={() => onShow(item)}
                        className="fa fa-trash text-danger"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

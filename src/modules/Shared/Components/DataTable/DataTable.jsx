import { Table } from "react-bootstrap";

export default function DataTable({ columns, data, onDelete }) {
  return (
    <>
      <Table hover>
        <thead className="table-header-style">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {onDelete && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {onDelete && (
                <td>
                  <i className="fa fa-edit text-warning mx-2"></i>
                  <i
                    onClick={() => onDelete(item.id)}
                    className="fa fa-trash text-danger"
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

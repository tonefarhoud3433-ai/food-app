import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import noDataImg from "../../../../assets/images/common/no-data.png";

export default function DeleteConfirmation({
  show,
  onConfirm,
  onClose,
  itemName,
  entityName,
}) {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={noDataImg}
            alt="delete confirmation image"
            style={{ maxWidth: "30%" }}
          />
          <h5 className="my-3">Delete This {entityName}</h5>
          <p>
            Are you sure you want to delete <strong>{itemName}</strong>? If you
            are sure, click confirm.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={onConfirm}>
            Delete {entityName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

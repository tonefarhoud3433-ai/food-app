import Modal from "react-bootstrap/Modal";

export default function AddModal({
  showAdd,
  handleAddClose,
  handleSubmit,
  onSubmit,
  title,
  children,
  loading,
}) {
  return (
    <>
      <Modal show={showAdd} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-end">
          <form onSubmit={handleSubmit(onSubmit)}>
            {children}
            <button
              type="submit"
              className={`${loading ? "btn btn-success disabled" : "btn btn-success"}`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

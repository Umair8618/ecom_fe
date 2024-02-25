import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Delete } from "../../Axios/Delete";
import { ENDPOINTS } from "../../Axios/EndPoints";

const DeleteProductModal = (props) => {
  const { record, onClose } = props;

  console.log(record)

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    Delete(`${ENDPOINTS.DELETE_PRODUCT}/${record?.uuid}`, "", false, "", false)
      .then((res) => {
        console.log(res)
        alert(res?.data?.message);
        window.location.reload();
        onClose();
      })
      .catch((error) => {
        alert("Error while deleting product", error);
      });
  };
  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete product?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductModal;

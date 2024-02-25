import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import { ENDPOINTS } from "../../Axios/EndPoints";
import { Post } from "../../Axios/Post";

const EditProductModal = (props) => {
  const { record, onClose } = props;

  const [productName, setProductName] = useState(record?.name || "");
  const [description, setDescription] = useState(record?.description || "");
  const [price, setPrice] = useState(record?.price || "");
  const [category, setCategory] = useState(record?.category || "");

  const handleEditProduct = (e) => {
    e.preventDefault();
    const formData = {
        name: productName,
        description: description,
        price: price.toString(),
        category: category,
    }

    Post(
      `${ENDPOINTS.UPDATE_PRODUCTS}/${record?.uuid}`,
      JSON.stringify(formData),
      false,
      "",
      ""
    )
      .then((res) => {
        if (res?.data?.success) {
          alert(res?.data?.message);
          window.location.reload();
          onClose();
          setProductName("");
          setDescription("");
          setPrice("");
          setCategory("");
        }
      })
      .catch((error) => {
        alert("Error while editing product", error);
      });
  };
  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="d-flex flex-column gap-3"
            onSubmit={handleEditProduct}
          >
            <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            EDIT PRODUCT
          </Button>

           
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductModal;

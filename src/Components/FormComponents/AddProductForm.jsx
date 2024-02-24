// AddProductForm
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import { Post } from "../../Axios/Post";
// import { SETTINGS_ENDPOINTS } from "../../Axios/EndPoints";

const AddProductForm = (props) => {
  let { handleButtonClick } = props;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("setting_key", settingKey);
//     formData.append("setting_value", settingValue);

//     Post(`${SETTINGS_ENDPOINTS.CREATE_SETTING}`, formData, true, token, "")
//       .then((res) => {
//         if (res?.data?.success) {
//           alert(res?.data?.message);
//           handleButtonClick();
//           setSettingKey("");
//           setSettingValue("");
//         }
//       })
//       .catch((error) => {
//         alert("Error while adding setting", error);
//       });
//   };

const handleSubmit = (e) => {
    e.preventDefault();

    // Your form submission logic goes here

    // Example: Log form values to console
    console.log("Product Name:", productName);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Category:", category);

    // Additional logic to call handleButtonClick, clear form, etc.
  };
  
  return (
    <>
      {" "}
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
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
            ADD PRODUCT
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddProductForm;

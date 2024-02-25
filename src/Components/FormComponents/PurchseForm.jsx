// PurchseForm
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ENDPOINTS } from "../../Axios/EndPoints";
import { Post } from "../../Axios/Post";
import axios from "axios";
import { BASE_URL1 } from "../../Constants/Constants";

const PurchseForm = (props) => {
  let { handleButtonClick } = props;

  // New state for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Function to handle numeric input validation
  const handleNumericInput = (e, setStateFunction) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    setStateFunction(numericValue);
  };

  // Function to handle expiry date input validation
  const handleExpiryDateInput = (e) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, '') // Remove non-numeric characters
      .replace(/^(\d{2})/, '$1/'); // Add a '/' after the first two digits (month)
    setExpiryDate(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(BASE_URL1 + `${ENDPOINTS.SAVE_CARD_DETAILS}`)
      .then((res) => {
        // console.log("res >>", res)
        alert(res?.data?.message+" with order id "+res?.data?.orderID );
        handleButtonClick();
        window.location.replace("/");
      })
      .catch((error) => {
        alert("Error while processing card details", error);
      });

    // const formData = {
    //     cardNumber: cardNumber,
    //     expiryDate: expiryDate.toString(),
    //     cvv: cvv,
    //   }

    // Use your endpoint for handling card details
    // Post(`${ENDPOINTS.SAVE_CARD_DETAILS}`, formData, false, "", "")
    //   .then((res) => {
    //     if (res?.data?.success) {
    //       alert(res?.data?.message);
    //       handleButtonClick();
    //       // Clear card details
    //       setCardNumber("");
    //       setExpiryDate("");
    //       setCvv("");
    //     }
    //   })
    //   .catch((error) => {
    //     alert("Error while processing card details", error);
    //   });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Card Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {/* New form fields for card details */}
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => handleNumericInput(e, setCardNumber)}
              required
            />
          </Form.Group>

          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date (MM/YY)</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="cvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => handleNumericInput(e, setCvv)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            SUBMIT CARD DETAILS
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default PurchseForm;

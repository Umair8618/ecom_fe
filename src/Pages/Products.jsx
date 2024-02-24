import React, { useState } from "react";
import { Table } from "antd";
import { Button, Form, InputGroup } from "react-bootstrap";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import ModalComponent from "../Components/ModalComponent/ModalComponent";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [record, setRecord] = useState({});
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [page, setPage] = useState(1);

  // const fetchProducts = () => {
  //     Get(SETTINGS_ENDPOINTS.ALL_SETTINGS, true, token)
  //       .then((res) => {
  //         if (res?.data?.success) {
  //           setAllSetting(res?.data?.data);
  //         } else {
  //           console.error("Setting Api Fetched But Success Is False");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error while fetching all settings ");
  //       });
  //   };

  //   useEffect(() => {
  //     fetchSettings();

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setIsProduct(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setIsProduct(false);
    setEditProductModal(false);
    setDeleteProductModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(false);
    setIsProduct(false);
    window.location.reload();
  };

  const productDataColumns = [
    {
      title: "#",
      key: "index",
      width: 50,
      //   render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 100,
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 100,
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      key: "category",
    },
    {
      title: "Action",
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <>
          <div className="d-flex gap-3">
            <AiOutlineEdit
              role="button"
              color="green"
              onClick={() => handleEdit(record)}
            />
            <AiOutlineDelete
              role="button"
              color="red"
              onClick={() => handleDelete(record)}
            />
          </div>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditProductModal(true);
    setRecord(record);
  };
  const handleDelete = (record) => {
    setDeleteProductModal(true);
    setRecord(record);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between">
        <Form className="w-75">
          <Form.Group controlId="formBasicSearch">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                //   onChange={(e) => {
                //     const currValue = e.target.value;
                //     const filteredData = allSettings.filter((entry) =>
                //       entry.setting_key.includes(currValue)
                //     );
                //     if (currValue === "") {
                //       fetchSettings();
                //     } else {
                //       setAllSetting(filteredData);
                //     }
                //   }}
              />
              <InputGroup.Text>
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          className="add-button"
          onClick={handleOpenModal}
        >
          Add Product
        </Button>
      </div>
      {showModal && (
        <ModalComponent
          onClose={handleCloseModal}
          onButtonClick={handleButtonClick}
          isProduct={isProduct}
        />
      )}
      {/* {editSettingModal && (
          <EditSettingModal
            onClose={handleCloseModal}
            onButtonClick={handleButtonClick}
            record={record}
          />
        )}
        {deleteSettingModal && (
          <DeleteSettingModal
            onClose={handleCloseModal}
            onButtonClick={handleButtonClick}
            record={record}
          />
        )} */}
    </div>
  );
};

export default Products;

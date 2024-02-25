import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Button, Form, InputGroup } from "react-bootstrap";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai";
import ModalComponent from "../Components/ModalComponent/ModalComponent";
import EditProductModal from "../Components/ModalComponent/EditProductModal";
import { ENDPOINTS } from "../Axios/EndPoints";
import { Get } from "../Axios/Get";
import DeleteProductModal from "../Components/ModalComponent/DeleteProductModal";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [record, setRecord] = useState({});
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = () => {
    Get(ENDPOINTS.ALL_PRODUCTS, false, "")
      .then((res) => {
        if (res?.data?.success) {
          setAllProducts(res?.data?.products);
        } else {
          console.error("Products Api Fetched But Success Is False");
        }
      })
      .catch((error) => {
        console.log("error while fetching all products ");
      });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
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
                placeholder="Search by name or category"
                onChange={(e) => {
                  const currValue = e.target.value.toLowerCase();
                  const filteredData = allProducts?.filter(
                    (entry) =>
                      entry?.name?.toLowerCase().includes(currValue) ||
                      entry?.category?.toLowerCase().includes(currValue)
                  );
                  if (currValue === "") {
                    fetchProducts();
                  } else {
                    setAllProducts(filteredData);
                  }
                }}
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
      <div className="mt-3 w-100 h-100">
        <Table
          // rowSelection={rowSelection}
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
          columns={productDataColumns}
          dataSource={allProducts}
          scroll={{
            x: "100%",
            y: "90vh",
          }}
          bordered
        />
      </div>
      {showModal && (
        <ModalComponent
          onClose={handleCloseModal}
          onButtonClick={handleButtonClick}
          isProduct={isProduct}
        />
      )}
      {editProductModal && (
        <EditProductModal
          onClose={handleCloseModal}
          onButtonClick={handleButtonClick}
          record={record}
        />
      )}
      {deleteProductModal && (
        <DeleteProductModal
          onClose={handleCloseModal}
          onButtonClick={handleButtonClick}
          record={record}
        />
      )}
    </div>
  );
};

export default Products;

import { Modal } from "react-bootstrap";
import AddProductForm from "../FormComponents/AddProductForm";

const ModalComponent = (props) => {
  let { onClose, onButtonClick, isProduct } = props;

  const handleCloseModal = () => {
    onClose();
  };
  const handleButtonClick = () => {
    onButtonClick();
  };

  const renderUser = () => {
    return (
      <>
        <Modal show={true} onHide={handleCloseModal}>
          <AddProductForm handleButtonClick={handleButtonClick} />
        </Modal>
      </>
    );
  };

  const renderMain = () => {
    return <>{isProduct && renderUser()}</>;
  };
  return renderMain();
};

export default ModalComponent;

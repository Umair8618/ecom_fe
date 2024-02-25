import { Modal } from "react-bootstrap";
import AddProductForm from "../FormComponents/AddProductForm";
import PurchseForm from "../FormComponents/PurchseForm";

const ModalComponent = (props) => {
  let { onClose, onButtonClick, isProduct, isPurchase } = props;

  const handleCloseModal = () => {
    onClose();
  };
  const handleButtonClick = () => {
    onButtonClick();
  };

  const renderProduct = () => {
    return (
      <>
        <Modal show={true} onHide={handleCloseModal}>
          <AddProductForm handleButtonClick={handleButtonClick} />
        </Modal>
      </>
    );
  };
  
  const renderPurchase = () => {
    return (
      <>
        <Modal show={true} onHide={handleCloseModal}>
          <PurchseForm handleButtonClick={handleButtonClick} />
        </Modal>
      </>
    );
  };

  const renderMain = () => {
    return <>
    {isProduct && renderProduct()}
    {isPurchase && renderPurchase()}
    </>;
  };
  return renderMain();
};

export default ModalComponent;

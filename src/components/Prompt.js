import { Modal, Button } from "react-bootstrap";
const Prompt = (props) => {
  return (
    <Modal show={when} onHide={handleClose}>
      <Modal.Header closeButton>Leave this page</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Prompt;

import { Modal, Button } from "react-bootstrap";
const Prompt = ({ showDialog, cancelNavigation, confirmNavigation }) => {
  return (
    <Modal show={showDialog} onHide={cancelNavigation}>
      <Modal.Header closeButton>Leave this page</Modal.Header>
      <Modal.Body>
        There are some unsaved changes, Are you sure you want to navigate?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelNavigation}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmNavigation}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Prompt;

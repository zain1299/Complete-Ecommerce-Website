import React from "react";
import { Button, Modal } from "react-bootstrap";

const NewModal = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          {props.buttonTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;

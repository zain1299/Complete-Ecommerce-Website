import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
      />
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
}

export default Input;

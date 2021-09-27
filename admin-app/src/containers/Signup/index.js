import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/LayOut";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Signup } from "../../actions";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const auth = state.auth;
  const user = state.user;

  const userSignup = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    dispatch(Signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
    // <Redirect to={"/"} />
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "90px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    Label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required={true}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    Label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required={true}
                  />
                </Col>
              </Row>
              <Input
                Label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <Input
                Label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignUp;

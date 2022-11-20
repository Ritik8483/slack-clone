import { Formik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { useContextApi } from "../../firebaseServices/firebaseServices";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: lightcyan;
`;
const LoginCard = styled.div`
  width: 500px;
  height: auto;
  background-color: white;
  padding: 25px;
  object-fit: cover;
  border-radius: 7px;
  @media (max-width: 768px) {
    width: 350px;
  }
  > h3,
  p {
    margin-top: 5px;
    text-align: center;
  }
  > h3 {
    margin-top: 10px;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  let schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
  });
  const navigate=useNavigate();
  const {forgotPassword}=useContextApi();

  const submitDetails=async(values)=>{
    try {
      const forgotpassword=await forgotPassword(values?.email);
      navigate('/');
      toast("Please check your email(spam folder)!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <LoginContainer>
        <LoginCard>
          <ImageContainer>
            <img
              src="https://imgur.com/KhqZVcS.png"
              alt="slackLogo"
              height="70"
              width="70"
            />
          </ImageContainer>
          <h3>Forgot Password?</h3>
          <p>slack.family.com</p>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitDetails}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group md="4" controlId="validationFormik01">
                  <Form.Label>Please enter your registered email address.</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={props.values.email}
                    onChange={props.handleChange}
                    isValid={props.touched.email && !props.errors.email}
                    isInvalid={!!props.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {props?.errors?.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-4 w-100" type="submit">
                  {props.isSubmitting ? "Submitting.." : "Submit form"}
                </Button>
                <Button onClick={() => navigate("/")} className="mt-4 w-100">
              Go Back
            </Button>
              </Form>
            )}
          </Formik>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default ForgotPassword;

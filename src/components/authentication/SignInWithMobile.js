import { Formik } from "formik";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContextApi } from "../../firebaseServices/firebaseServices";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { storeMobileId, storeUserToken } from "../../redux/slackRedux";

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

const SignUp = () => {
  const [toggleOtp, setToggleOtp] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResp, setConfirmResp] = useState("");
  const [validated, setValidated] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signInWithNumber } = useContextApi();
  const userTokenId = useSelector((state) => state.slackReducer.userToken);
  // if (userTokenId) {
  //   return <Navigate to="/slack-app" />;
  // }
  // const mobileID = useSelector((state) => state.slackReducer.mobileId);

  const submitDetails = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const response = await signInWithNumber(phoneNo);
      dispatch(storeUserToken(response?.verificationId));
      setConfirmResp(response);
      // if(userTokenId){
      //   toast.success("User logged in successfully")
      // }
      // else{
      //   toast.success("OTP sent successfully")
      // }
      toast.success("OTP sent successfully")
      setRedirect(true)
      // toast.success(userTokenId ? "User logged in successfully" :"OTP sent successfully");
      setToggleOtp(!toggleOtp);
      // navigate('/');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setValidated(true);
  };

  const submitVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) {
      return;
    }
    try {
      await confirmResp.confirm(otp);
      navigate("/slack-app");
      // setToggleOtp(!toggleOtp);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if (userTokenId) {
  //   return <Navigate to="/slack-app" />;
  // }

  return (
    <div>
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
          <h3>Sign in the slack family using phone number</h3>
          <p>slack.family.com</p>
          <Form
            style={{ display: !toggleOtp ? "block" : "none" }}
            onSubmit={submitDetails}
            noValidate
            validated={validated}
          >
            <Form.Group className="mt-3" md="4" controlId="validationFormik01">
              <Form.Label>Phone number</Form.Label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={phoneNo}
                onChange={setPhoneNo}
              />
              <div id="recaptcha-container"></div>
            </Form.Group>
            <Button className="mt-4 w-100" type="submit">
              Send OTP
            </Button>
            <Button onClick={() => navigate("/")} className="mt-4 w-100">
              Go Back
            </Button>
          </Form>

          <Form
            style={{ display: toggleOtp ? "block" : "none" }}
            onSubmit={submitVerifyOtp}
          >
            <Form.Group className="mt-3" md="4" controlId="validationFormik01">
              <Form.Label>Verify OTP</Form.Label>
              <Form.Control
                type="number"
                name="otp"
                vlaue="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter otp"
              />
            </Form.Group>
            <Button className="mt-4 w-100" type="submit">
              Verify OTP
            </Button>
            <Button onClick={() => navigate("/")} className="mt-4 w-100">
              Go Back
            </Button>
          </Form>
        </LoginCard>
      </LoginContainer>
    </div>
  );
};

export default SignUp;

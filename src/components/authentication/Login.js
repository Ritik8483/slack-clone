import { Formik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContextApi } from "../../firebaseServices/firebaseServices";
import { useDispatch, useSelector } from "react-redux";
import { storeUserToken } from "../../redux/slackRedux";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

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
    font-weight: bold;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const EyeLabel = styled.div`
  position: absolute;
  right: 11px;
  top: 35px;
  font-size: 18px;
  cursor: pointer;
  color: grey;
`;

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [toggleEye, setToggleEye] = useState(false);
  let schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logIn, signInWithGoogle } = useContextApi();

  const useSelectorData = useSelector((state) => state.slackReducer.userToken);
  const submitDetails = async (values, { resetForm }) => {
    try {
      const loginResponse = await logIn(values.email, values.password);
      dispatch(storeUserToken(loginResponse?._tokenResponse?.idToken));
      navigate("slack-app");
      toast.success("User logged in successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    // resetForm();
  };
  const handleGoogle = async () => {
    try {
      const resp=await signInWithGoogle();
      dispatch(storeUserToken(resp?.user?.accessToken));
      toast.success("User signed in successfully");
      navigate("slack-app");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLoginWithMobile = () => {
    navigate("signin-mobile");
  };

  if (useSelectorData) {
    return <Navigate to="slack-app" />;
  }
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
          <h3>Sign in to the slack family</h3>
          <p>slack.family.com</p>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitDetails}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group md="4" controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
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
                    {props.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  md="4"
                  className="mt-3 position-relative"
                  controlId="validationFormik02"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    style={{ paddingRight: "40px" }}
                    type={toggleEye ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={props.values.password}
                    onChange={props.handleChange}
                    isValid={props.touched.password && !props.errors.password}
                    isInvalid={!!props.errors.password}
                  />
                  <EyeLabel
                    style={{
                      display:
                        !!props.errors.password || props.touched.password
                          ? "none"
                          : "block",
                    }}
                    onClick={() => setToggleEye(!toggleEye)}
                  >
                    {toggleEye ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                  </EyeLabel>
                  <Form.Control.Feedback type="invalid">
                    {props.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-4 w-100" type="submit">
                  {props.isSubmitting ? "Submitting.." : "Submit form"}
                </Button>
                <Button
                  onClick={handleGoogle}
                  className="mt-4 w-100"
                  variant="info"
                >
                  <FcGoogle
                    style={{
                      marginTop: "-5px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />{" "}
                  Sign in with Google
                </Button>
                <Button
                  onClick={handleLoginWithMobile}
                  className="mt-4 w-100"
                  variant="info"
                >
                  <FcPhoneAndroid
                    style={{
                      marginTop: "-5px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />{" "}
                  Sign in with Phone number
                </Button>
                <p className="mt-4">
                  <Link to="forgot-password">Forgot Password?</Link>
                </p>
                <p className="mt-4">
                  Don't have an account? <Link to="signup">Signup</Link>
                </p>
              </Form>
            )}
          </Formik>
        </LoginCard>
      </LoginContainer>
    </div>
  );
};

export default Login;

import { Formik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContextApi } from "../../firebaseServices/firebaseServices";
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

const SignUp = () => {
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
  const { signUp } = useContextApi();

  const submitDetails = async (values, { resetForm }) => {
    try {
      await signUp(values.email, values.password);
      toast.success("User signup successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    // resetForm();
  };

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
          <h3>Sign up to the slack family</h3>
          <p>slack.family.com</p>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitDetails}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group
                  className="mt-3"
                  md="4"
                  controlId="validationFormik01"
                >
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
                  Submit form
                  {/* {props.isSubmitting ? "Submitting.." : "Submit form"} */}
                </Button>
                <p className="mt-4">
                  Already have an account? <Link to="/">Login</Link>
                </p>
              </Form>
            )}
          </Formik>
        </LoginCard>
      </LoginContainer>
    </div>
  );
};

export default SignUp;

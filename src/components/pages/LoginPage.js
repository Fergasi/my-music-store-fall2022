import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Layout from "../layout/Layout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import EmailField from "../textFields/EmailField";
import PasswordField from "../textFields/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../redux-state/userSlice";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";
import Axios from "../../utils/Axios";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setSignInForm({ ...signInForm, [prop]: event.target.value });
  };

  const onLogin = async () => {
    try {
      //call the back end with the login credentials
      const response = await Axios.post("/sign-in", {
        credentials: signInForm,
      });

      //insert fetched user into the state
      const fetchedUser = response.data.user;

      dispatch(signIn(fetchedUser));
      navigate("/");
    } catch (e) {
      setError(`${e.response.data.message}, please try again`);
      setTimeout(() => {
        setError("");
      }, "4000");
    }
  };

  const onLogOut = async () => {
    try {
      await Axios.get("/sign-out");
      dispatch(signOut());
    } catch (e) {
      setError("Network error, please try again");
      setTimeout(() => {
        setError("");
      }, "4000");
    }
  };

  return (
    <Layout>
      {!user ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "25vh" }}
        >
          <EmailField
            userData={signInForm}
            value={signInForm.email}
            handleChange={handleChange}
          />
          <PasswordField
            userData={signInForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            value={signInForm.password}
            handleChange={handleChange}
          />
          <br />
          {error && (
            <Alert
              severity='error'
              sx={{
                position: "absolute",
                zIndex: "1",
                left: "50%",
                top: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {error}
            </Alert>
          )}
          <br />
          <Button variant='contained' color='success' onClick={onLogin}>
            Login
          </Button>
          <br />
          <br />
          <Typography
            component='div'
            // style={{ fontWeight: "bold" }}
            sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
            onClick={() => navigate("/register-user")}
          >
            Sign up?
          </Typography>
        </Box>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "35vh" }}
        >
          <Button variant='contained' color='error' onClick={onLogOut}>
            Logout
          </Button>
          <br />
          {error && <Alert severity='error'>{error}</Alert>}
          <br />
        </Box>
      )}
    </Layout>
  );
};

export default LoginPage;

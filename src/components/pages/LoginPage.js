import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Layout from "../layout/Layout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UsernameField from "../textFields/UsernameField";
import PasswordField from "../textFields/PasswordField";
import { UserLoginContext } from "../../App";

const LoginPage = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useContext(UserLoginContext);
  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  return (
    <Layout>
      {!loggedIn ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "25vh" }}
        >
          <UsernameField user={user} handleChange={handleChange} />
          <PasswordField
            user={user}
            handleChange={handleChange}
            handleClickShowPassword={handleClickShowPassword}
          />
          <br />
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              setLoggedIn(true), navigate("/home"), console.log(user);
            }}
          >
            Login
          </Button>
        </Box>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "35vh" }}
        >
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              setLoggedIn(false);
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default LoginPage;

import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Layout from "../layout/Layout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UsernameField from "../textFields/UsernameField";
import PasswordField from "../textFields/PasswordField";
import { userContext } from "../../context/userContext";

const LoginPage = () => {
  let navigate = useNavigate();
  const { user, signIn, signOut } = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
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
          <UsernameField
            userData={userData}
            value={userData.username}
            handleChange={handleChange}
          />
          <PasswordField
            userData={userData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            value={userData.password}
            handleChange={handleChange}
          />
          <br />
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              signIn(userData), navigate("/home");
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
              signOut();
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

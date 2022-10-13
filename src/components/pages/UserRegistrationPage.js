import React, { useState } from "react";
import Layout from "../layout/Layout";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import EmailField from "../textFields/EmailField";
import PasswordField from "../textFields/PasswordField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../redux-state/userSlice";
import axios from "axios";
import Axios from "../../utils/Axios";
import { useNavigate } from "react-router-dom";

const UserRegistrationPage = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  const [userRegistrationForm, setUserRegistrationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleChange = (prop) => (event) => {
    setUserRegistrationForm({
      ...userRegistrationForm,
      [prop]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    //make sure form is correct
    event.preventDefault();
    setError(undefined);

    try {
      const response = await axios.post("http://localhost:3010/register-user", {
        ...userRegistrationForm,
      });

      const { user } = response.data;

      dispatch(signIn(user));

      setUserRegistrationForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profilePicture: "",
      });

      navigate("/");
    } catch (e) {
      setError(`${e.response.data.message}, please try again`);
      setTimeout(() => {
        setError("");
      }, "4000");
    }
  };

  const onLogout = () => {
    dispatch(signOut());
    navigate(() => navigate("/sign-in"));
  };

  return (
    <Layout>
      {!user ? (
        <>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            style={{ marginTop: "5vh" }}
          >
            <Typography fontWeight='bold' fontSize='larger'>
              Create User Account
            </Typography>
          </Box>
          <form action='submit' onSubmit={handleSubmit}>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              style={{ marginTop: "5vh" }}
            >
              <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  First Name
                </InputLabel>
                <OutlinedInput
                  id='input-firstname'
                  value={userRegistrationForm.firstName}
                  onChange={handleChange("firstName")}
                  required
                  label='First Name'
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id='input-lastname'
                  value={userRegistrationForm.lastName}
                  onChange={handleChange("lastName")}
                  required
                  label='Last Name'
                />
              </FormControl>
              <EmailField
                userData={userRegistrationForm}
                value={userRegistrationForm.email}
                handleChange={handleChange}
              />
              <PasswordField
                userData={userRegistrationForm}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                value={userRegistrationForm.password}
                handleChange={handleChange}
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Profile Picture URL
                </InputLabel>
                <OutlinedInput
                  id='input-profilePicture'
                  value={userRegistrationForm.profilePicture}
                  onChange={handleChange("profilePicture")}
                  label='Profile Picture URL'
                />
              </FormControl>
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
              <Button type='submit' variant='contained' color='success'>
                Submit
              </Button>
              <br />
              <br />
              <Typography
                component='div'
                sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
                onClick={() => navigate("/sign-in")}
              >
                Sign in?
              </Typography>
            </Box>
          </form>{" "}
        </>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "35vh" }}
        >
          <Button variant='contained' color='error' onClick={onLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default UserRegistrationPage;

import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { sampleUserData } from "../../mockData";
import { useSelector } from "react-redux";

export default function MenuAppBar() {
  const user = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' bgcolor='red'>
        <Toolbar>
          <Typography
            variant='h6'
            fontWeight='bold'
            component='div'
            sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
            onClick={() => navigate("/home")}
          >
            MyMusicStore.com
          </Typography>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={() => navigate("/cart")}
            >
              <Badge
                badgeContent={shoppingCart.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
                color='success'
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={() => navigate("/sign-in")}
            >
              {user ? (
                <img
                  src={sampleUserData.profilePicture}
                  style={{ borderRadius: "50%", height: "38px" }}
                ></img>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

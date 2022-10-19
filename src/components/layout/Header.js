import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Alert } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux-state/userSlice";
import Axios from "../../utils/Axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MenuAppBar() {
  const user = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const onLogin = () => {
    navigate("/sign-in");
    return;
  };

  const onCreateProduct = () => {
    navigate("/create-product");
    return;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' bgcolor='red'>
        <Toolbar>
          <Typography
            variant='h6'
            fontWeight='bold'
            component='div'
            sx={{
              marginTop: "5px",
              flexGrow: 1,
            }}
          >
            <img
              src='/ecomLogo3.png'
              style={{
                height: "50px",
                marginTop: "5px",
              }}
            ></img>
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
            <Tooltip title='Account settings'>
              <IconButton
                size='large'
                aria-label='account of current user'
                color='inherit'
                onClick={handleClick}
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
              >
                {user && user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    style={{
                      borderRadius: "50%",
                      height: "32px",
                      border: "2px solid white",
                      objectFit: "cover",
                    }}
                  ></img>
                ) : (
                  <AccountCircle fontSize='large' />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon fontSize='small' />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={() => navigate("/user-favorites")}>
          <ListItemIcon>
            <FavoriteIcon fontSize='small' />
          </ListItemIcon>
          Favorites
        </MenuItem>
        <Divider />
        {user && user.isAdmin && (
          <MenuItem onClick={onCreateProduct}>
            <ListItemIcon>
              <AddBusinessIcon fontSize='small' />
            </ListItemIcon>
            Add Products
          </MenuItem>
        )}
        {user && (
          <MenuItem onClick={onLogOut}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
        {!user && (
          <MenuItem onClick={onLogin}>
            <ListItemIcon>
              <Login fontSize='small' />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
      {error && <Alert severity='error'>{error}</Alert>}
    </Box>
  );
}

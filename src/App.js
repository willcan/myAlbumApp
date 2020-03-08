import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import photos from "./Photos";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth } from "./firebase";


export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
          >
            My App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </Drawer>
      <Photos/>
    </div>
  );
}

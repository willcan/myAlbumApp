import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Photos from "./Photos";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import AddAlbum from "./AddAlbum";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { auth, db } from "./firebase";


export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialogue_open, setDialogueOpen] = useState(false);
  const [albums, setAlbums] = useState([{id: 0, name: 'Nature'}, {id: 1, name: "Cities"}]);

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

  useEffect(()=>{
      if (user) {
    db.collection('user')
    .doc(user.uid)
    .collection('albums')
    .onSnapshot((snapshot)=>{
      const updated_albums = []
      snapshot.forEach((s)=>{
        const data = s.data();
        data.id = s.id;
        updated_albums.push(data)
          console.log(data);
        setAlbums(updated_albums)
      });

    })
  }
  }, [])

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
         <List component="nav">
           {albums.map((a)=>{
             return(
              <ListItem button to={"/app/album/" + a.id + "/"} component={Link} onClick={() => {setDrawerOpen(false)}}>
              <ListItemText primary={a.name} />
            </ListItem>
             )
             })}
      
          <ListItem 
            button 
            onClick={()=>{
              setDialogueOpen(true)}}>
            <ListItemText primary="Create new album" />
          </ListItem>
        </List>

      </Drawer>
      <AddAlbum open={dialogue_open} onClose={()=>{setDialogueOpen(false)}} user={user}/>
      <Route path="/app/album/:album_id/" render = {() => {
        return (
          <Photos/>
        )
      }}/>
  
      </div>
  );
  }

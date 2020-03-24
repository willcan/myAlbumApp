import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Textfield from '@material-ui/core/Textfield';
import {db} from "./firebase";

export default function PublicPhoto(props) {
  const [name, setName] = useState("")

  const handleSaveAlbum = () => {
    db.collection("users").doc(props.user.uid).collection('albums').add({name: name})
    console.log("handleSaveAlbum")
  }
    return(
      <div>
        <Dialog
        open={props.open}
        maxWidth='sm'
        fullWidth
        onClose={props.onClose}
      >
        <DialogTitle>Add an album</DialogTitle>
        <DialogContent>
        <Textfield label="Album Name" fullWidth value={name} onChange={(e) => {setName(e.target.value)}}/>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button color="primary" variant='contained' onClick={handleSaveAlbum}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}
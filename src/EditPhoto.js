import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Textfield from '@material-ui/core/Textfield';
import {db, storage, snapshotToArray} from "./firebase";
import uuid from 'node-uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


export default function AddPhoto(props) {
  const [title, setTitle] = useState("")
  

  const handleSavePhoto = () => {
    //save the file to Firebase storage
        db.collection('users').doc(props.user.uid).collection('albums').doc(props.albumid).collection('photos').doc(props.photoID).set({ title: title }, { merge: true })
          setTitle("");
          props.onClose();



        }

    //get the download url

    //save the title and the download url to firestore

    //close the dialogue box when done 
    
    return(
        <Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Photo name</DialogTitle>
        <DialogContent>
        <Textfield 
        label="Photo Title" 
        fullwidth value={title} 
        onChange = {(e)=>{
          setTitle(e.target.value)
          }}
          />
          </DialogContent>
          <DialogActions>
          <div style={{position: 'relative'}}>
          <Button color="primary" variant='contained' onClick={handleSavePhoto}>
            Save
          </Button>
            </div>
        </DialogActions>
      </Dialog>
    )
        }
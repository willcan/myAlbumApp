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
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false);

  const handleSavePhoto = () => {
    //save the file to Firebase storage
setSaving(true);
    storage.ref("photos/" + uuid()). put(file).then((snapshot)=>{
      snapshot.ref.getDownloadURL().then((downloadURL)=>{
        db.collection('users').doc(props.user.uid).collection('albums').doc(props.album_id).collection('photos').add({title:"title", image:downloadURL}).then(()=>{
          setTitle("");
          setFile(null);
          setSaving(false);
          props.onClose();

        })
      })

    });
    //get the download url

    //save the title and the download url to firestore

    //close the dialogue box when done 
    db.collection('users').doc(props.user.uid).collection('albums').doc(props.album_id).collection('photos').add({title:"title", image:""})

    
  }
    const handleFile = (e) => {
      const file = e.target.files[0]
      setFile(file)
    }
    return(
        <Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Add a photo</DialogTitle>
        <DialogContent>
        <Textfield 
        label="Photo Title" 
        fullwidth value={title} 
        onChange = {(e)=>{
          setTitle(e.target.value)
          }}
          />
          <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          {file && <Typography>{file.name}</Typography>}
        <Button variant='contained' style={{marginTop: 20}} component='label'>
          Choose a file
          <input type="file" onChange={handleFile} style={{display: 'none'}}/>
          </Button>
          <Button  color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          </div>
          </DialogContent>
          <DialogActions>
          <div style={{position: 'relative'}}>
          <Button color="primary" variant='contained' onClick={handleSavePhoto}>
            Save
          </Button>
          {saving && <CircularProgress style={{position: 'absolute', top:'50%', left:'50%', marginTop: -12, marginLeft: -12 }} color="secondary" size={24}/>}
          </div>
        </DialogActions>
      </Dialog>
    )
}
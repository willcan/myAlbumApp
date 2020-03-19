import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Textfield from '@material-ui/core/Textfield';

export default function AddAlbum(props) {
    return(
      <div>
        <Dialog
        open={false}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Add album</DialogTitle>
        <DialogContent>
        <Textfield label="Album Name" fullwidth/>
        <Button variant='contained' style={{marginTop: 20}}>Choose a file</Button>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}
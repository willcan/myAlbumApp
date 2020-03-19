import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import Button from "@material-ui/core/Button";


export default function Photos(props) {
    const [dialogue_open, setDialogueOpen] = useState(false)

    return(
        <div style={{display: 'flex', flexWrap: 'wrap', paddingLeft: 10, paddingTop: 10 }}>
            <PhotoCard/>
            <PhotoCard/>
            <PhotoCard/>
            <PhotoCard/>
            <Button variant="contained" color="secondary" style={{marginTop: 10}}>Add Photo</Button>
            <AddPhoto open={dialogue_open}/>
         </div>
    )
}
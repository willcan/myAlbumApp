import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import Button from "@material-ui/core/Button";


export default function Photos(props) {
    const [dialogue_open, setDialogueOpen] = useState(false)
    const [photos, setPhotos] = useState([{id: 0, title: 'River', image: "https://images.pexels.com/photos/3857215/pexels-photo-3857215.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},{id: 1, title: 'River', image: "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},{id: 2, title: "Land", image:"https://images.pexels.com/photos/2406660/pexels-photo-2406660.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}])
    return(
        <div style={{display: 'flex', flexWrap: 'wrap', paddingLeft: 10, paddingTop: 10 }}>
            {photos.map((p) => {
                return (
                    <PhotoCard photo={p}/>
                )
            })}
            <div>
            <Button variant="contained" color="secondary" style={{marginTop: 10}} onClick={()=>{setDialogueOpen(true)}}>Add Photo</Button>
            <AddPhoto open={dialogue_open} onClose={()=>{setDialogueOpen(false)}}/>
            </div>
         </div>
    )
}
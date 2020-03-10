import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";


export default function Photos(props) {
    return(
        <div>
            Photos
            <PhotoCard/>
            <AddPhoto/>
         </div>
    )
}
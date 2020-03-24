import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {db} from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import EditPhoto from "./EditPhoto"

export default function PhotoCard(props) {
  const [dialogOpen, setDialogOpen] = useState()

    return(
        <Card style={{maxWidth: 345, marginRight: 10, marginTop: 10}}>
      <CardActionArea>
        <CardMedia
          component='img'
          height="300"
          image={props.photo.image}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.photo.title}
          </Typography>
              <IconButton
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                <Edit />
              </IconButton>
            <EditPhoto
              open={dialogOpen}
              onClose={() => {
                setDialogOpen(false);
                console.log(props);
              }}
              photoID={props.photo.id}
              albumID={props.album_id}
              user={props.user}
            />
        </CardContent>
      </CardActionArea>
    </Card>

    )
}
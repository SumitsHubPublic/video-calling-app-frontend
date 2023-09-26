import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles(theme => ({
  video: {
    width: "400px",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
    borderRadius: "8px",
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();
  const { name, call, callAccepted, callEnded, myVideo, userVideo, stream } =
    useContext(SocketContext);
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={6} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Me"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {/* Other user's video */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={6} md={6} lg={6} sm={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

import { Container, makeStyles, Typography } from "@material-ui/core";
import React from 'react';
import { Link} from 'react-router-dom';

import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from "@material-ui/icons";

/* 100vh in the below case means that the height is full screen. */

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "95%",
    alignItems:"center",
    color: "black",
    paddingTop: theme.spacing(9),
    position: "sticky",
    marginRight:theme.spacing(1),
    top: 0,
    borderRight:"1px solid violet"
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 550,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();
  /* the <div> in the cases below are all used to create rows in the container.that is the container is like a column, and teh divs inside it are the rows.in that row we will have an Icon and a teaxt message desaribing the icon.this container will too be vidible to the end user.that is , where this component is called in the react <App> compnent , the container with rows will be visible there. */
  return (
    <Container className={classes.container}>
      {/* a conainer is just a div that ha got its width boued at 940px.the height is dynamic as per the ontents in it.this function can too be passed props that are then used to style it . className is one of the props .this container has a div in it , that div size is not limited, that is can fill the entire space of the container but now cannot go beyond a width of 940px*/}

      {/* note that a div is a block element , meaning that it inherits the default width of  the parent element(100% width of the element) . */}

      <div className={classes.item}>
        <Link to="/">
          <Home className={classes.icon} />
        </Link>
        <Typography className={classes.text}>Homepage</Typography>
      </div>
      <div className={classes.item}>
        <Person className={classes.icon} />
        <Typography className={classes.text}>My Profile</Typography>
      </div>
      <div className={classes.item}>
        <List className={classes.icon} />
        <Typography className={classes.text}>Categories</Typography>
      </div>
      <div className={classes.item}>
        <PhotoCamera className={classes.icon} />
        <Typography className={classes.text}>Camera</Typography>
      </div>
      <div className={classes.item}>
        <PlayCircleOutline className={classes.icon} />
        <Typography className={classes.text}>Videos</Typography>
      </div>
      <div className={classes.item}>
        <TabletMac className={classes.icon} />
        <Typography className={classes.text}>Apps</Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>Collections</Typography>
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon} />
        <Typography className={classes.text}>Market Place</Typography>
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Acc.Settings</Typography>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
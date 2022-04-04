import React from 'react';
import { Container, Grow, Grid} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Left from '../Leftbar/Left';
import Right from "../Rightbar/Rightbar";
import { useState } from 'react';
import makeStyles from './styles'

const Home = () => {
  const classes = makeStyles();

   const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>

      <Container maxWidth="xl">

        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={2} sm={2}>
            <Left />
          </Grid>
          
         <Grid item xs={10} sm={6} className={classes.itemContainer}>
            <Posts setCurrentId={setCurrentId} />
          </Grid> 
          
          <Grid item xs={12} sm={4} >
            <Right currentId={currentId}/>
          </Grid>

        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import { getPosts } from '../../actions/posts';

const page = 1;

const Posts = ({ setCurrentId }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getPosts(page));  

    //this line here will fetch the posts from the database and then will place them in the redux store . from the store we can then get them in any component .

  }, []);
  
  const { posts, isLoading } = useSelector((state) => state.posts);
  
  //Posts is an object that has (posts; an array )and isLoading , a variable that is either true or false !!!! 

  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No posts';
  
  return (
    isLoading ? <CircularProgress />
     : <Grid container className={classes.mainContainer} alignItems="stretch">
        {posts?.map((post) => (
          
          <Grid item key={post._id} xs={4} sm={12} md={12}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    
    );
};

export default Posts;

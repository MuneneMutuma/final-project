 import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
    border:"1px solid black "
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));




const Post = ({ post, setCurrentId }) => {
   

  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = user?.result.googleId || user?.result?._id;
  
  const classes = useStyles();

  const openPost = (e) => {

    history.push(`/posts/${post._id}`);
  };

  return (
      <Card className={classes.card}>
      
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
       <CardContent>
          <Typography gutterBottom variant="h5">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>

        </CardContent>


      <CardActions>
        <Button size="small" color="primary" variant="outlined" onClick={openPost}>
          Open Post
        </Button>
        

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                      <Button size="small" color="secondary" variant="outlined"  onClick={() => dispatch(deletePost(post._id))}>
                          <DeleteIcon fontSize="small" /> &nbsp; Delete
                      </Button>)}
      </CardActions>
    </Card>
  );
};

export default Post; 

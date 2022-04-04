import { likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { ThumbUpAltIcon } from '@material-ui/icons/ThumbUpAlt';
import { ThumbUpAltOutlined } from '@material-ui/icons/ThumbUpAltOutlined';
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
    cardAction:{
      dispaly:'flex',
      justifyContent:'space between',
    },OpenPostButton:{
      marginLeft:'10px',
    }
  },
}));


const Post = ({post, setCurrentId}) => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  /* the Likes array is an array of teh userId that have liked  the post.this is the only way we will keep one like per person.we first check if the array is not empty, if yes then check if there is a like equivalet to the userId curently logged. */

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }


    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };


  return (

      <Card className={classes.card}  sx={{ boxShadow: 4 }} >
      <CardActionArea>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}/>

        <CardContent>
          <Typography gutterBottom variant="h5" style={{color:'cream'}}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>

      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button className={classes.OpenPostButton} size="small" color="primary" variant="outlined" onClick={openPost}>
          Open Post
        </Button>
         {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" variant='outlined' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )} 
      </CardActions>
    </Card>
  
    
  );
};

export default Post;
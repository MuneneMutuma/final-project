import React, { useState } from 'react';
/* A post in thsi case is used in creation of the posts , not dispalying the post details. */
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  /* post is an object here passed from the Posts function. */
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
    /* when the user clicks the post , we redirect them to another url, the only way we will do that is by using the history.push!!!!  that creates a completely different path in the browser.while we are at that rute , then we make aother api request.*/

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>

      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

          <div className={classes.overlay2} name="edit">
            <Button onClick={(e) => {
              
              e.stopPropagation();
              setCurrentId(post._id);

              /*e.stopPropagation() prevents the parents from being noified of the event that has happened. 
              this line will change  the id everywhere, in the post, in the app and in the form , once the is changes , then the details anout that post are populated , that is the useEffect runs to fetch the details of that post from the server. */
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}

        
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>


      <CardActions className={classes.cardActions}>

        {/* cardActions tell us what we can do with that card , that is , like the card, delete the  caerd or comment a card ,if there is no user , then the card will be disabled. Aain , if the post is equal s the card id , then the user will be allowed to delete that post.that means that when creating a post , we will not give the user the ability to determine  the creator but the system will take the id of that user and use it to create a creator to that post. */}

        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>


    </Card>
  );
};

export default Post;
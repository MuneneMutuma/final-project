import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import Typical from 'react-typical';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import SuperwingLogo from '../../images/Superwing1.JPG';
import { Divider } from '@material-ui/core';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post); 

/*that is , if a post has been clicked , then set Post data to the data of that particular post by using useSelector to select a post from the state using  the id.
  A post will only exist if the MoreHoriz icon is  clicked ,,, else the id that is used in genearting the 'post' will not be present !!!*/

}, [post,clear]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      // if  a post is not yet clicked !!!
      
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.NotLoggedinPaper} elevation={6}>

        <Typography variant="h6" align="center">
          <img src={SuperwingLogo} alt="SuperWing Ltd." height="150px" width="150px" gutterBottom />
          <Divider></Divider>
          <br/>
          PLease sign in to:<br></br>

           <strong>(1)</strong> : <span style={{ color: "green" }}>
            Make your own Posts
          </span>
          <br />
           <strong>(2)</strong> : <span style={{ color: "green" }}>
            Review and like Other People's Posts
          </span>
          <br />


        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    
    /* react components are functions just like other functions.the only difference is that the  react components return a jsx elemet, and can even return  the whole website. */

    <Paper className={classes.LoggedinPaper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing... ${post?.title}` : 'Create  a Post'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Product Details:" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

        <TextField name="tags" variant="outlined" label="Tags:" fullWidth multiline rows={1} value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        
        
        <div className={classes.fileInput}><FileBase type="file" multiple={false} placeholder='Select File' onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 

        {/* the button in this case is of type submit and has the role of submitting the data details once it is pressed !!! on clicking this function then we call the submit button .. */}

        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
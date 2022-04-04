import { Container, makeStyles } from "@material-ui/core";
import React from 'react';
import { AppBar, TextField, Button  } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getPostsBySearch } from "../../actions/posts";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Form from '../Form/Form';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "95%",
    alignItems:"center",
    color: "white",
    paddingTop: theme.spacing(9),
    position: "sticky",
    marginRight:theme.spacing(1),
    top: 0,
    borderLeft:"1px solid violet"
  },
  item: {
    display: "flex",
    flexDirection:"row",
    alignItems:"spaceBetween",
    marginLeft:"0px",
    position: "relative",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },

  text: {
    fontWeight: 550,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    searchButton:{
      paddingLeft: "30px",
      marginLeft: theme.spacing(2),
      flexStart:"end",
    },
    searchIcon: {
      marginLeft: theme.spacing(6),
      paddingLeft:theme.spacing(2),
    },
  },
}));


const Rightbar = () => {

  function useQuery() {
  return new URLSearchParams(useLocation().search);
}
  const classes = useStyles();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
  /*Note that we only want to go with the strings from the frontend , not An array, for this reason we have to join the tags array.now iif the user entered a long string , we trim to ensure that we remain with a  signle string too.the title will then  be converted into a regex expression for querying databas*/
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search:search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
     
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };


  
  return (
    <Container className={classes.container}>
      
      <AppBar color="inherit" className={classes.item} gutterBottom>
        
        <TextField name="search" variant="outlined" label="Search products..." width="20%" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
        {/* note that the ChipInput usually takes an array as its value.  */}
        
        <IconButton onClick={searchPost} className={classes.searchButton} variant="filled" color="primary" size="large" ><Search variant="outlined" className={ classes.searchIcon}></Search></IconButton>
        
      </AppBar>
            
      <Form currentId={currentId} setCurrentId={setCurrentId} className={ classes.item}/>
      
    </Container>
  );
};

export default Rightbar;
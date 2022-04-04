import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    height:"10px",

    display: 'flex',
    top: theme.spacing(80),
    position: "fixed",
    marginLeft:theme.spacing(2),
    top: 61,
    left: 1050,
    right: 390,
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    divContainer: {
      marginTop: theme.spacing(2),
      border: "1px solid blue",
      margin:"2px"
      
    },
    form: {
      position: "fixed",
      top:1300
    },
    itemContainer:{
      paddingTop:theme.spacing(9),
    }
  },
}));
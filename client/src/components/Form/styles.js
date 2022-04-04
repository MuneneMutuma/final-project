import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    NotLoggedinPaper: {
        padding: theme.spacing(2),
        height: "350px",
    },
    LoggedinPaper: {
        padding: theme.spacing(3),
        height: "450px",
    },

    form: {
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: 'center',
        height: theme.spacing(20),

    },
    fileInput: {
        width: '97%',
        margin: '3px 0',
    },
    buttonSubmit: {  
        marginBottom: 10,
    },
}));
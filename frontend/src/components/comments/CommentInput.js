import { makeStyles } from '@material-ui/core/styles';
// import { TextField } from '@material-ui/core';
import { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputBox: {
    margin: '5px',
    height: '300px',
    width: ' auto',
    border: '2px solid green',
  },
}));

const CommentInput = props => {
  const { userName, onSubmit } = props;
  const [commentText, setCommentText] = useState('');

  // console.log(commentText);

  const handleSubmit = commentText => {
    const comment = { userName, commentText };
    onSubmit(commentText);
  };

  const classes = useStyles();
  return (
    <div className={classes.inputBox}>
      this is input area
      <h3>User Name: {userName}</h3>
      InputArea:
      <TextField
        label='comment'
        multiline
        fullWidth
        defaultValue='Comment'
        rows={6}
        onChange={e => setCommentText(e.target.value)}
      />
      <Button onClick={e => handleSubmit(commentText)}>Submit</Button>
    </div>
  );
};

export default CommentInput;

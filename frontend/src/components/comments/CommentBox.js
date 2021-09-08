import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    height: '700px',
    width: ' 500px',
    border: '2px solid black',
  },
}));

const CommentBox = props => {
  const classes = useStyles();
  const userName = 'User1';
  const [commentStorage, setCommentStorage] = useState(props.comments);
  const [newCommentObject, setNewCommentObject] = useState({
    ...props.newCommentObject,
    commentContent: '',
  });
  const updataComments = async newComment => {
    newCommentObject.commentContent = newComment;
    try {
      const res = await api.post('/comment', newCommentObject);
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }

    // newComment : {
    // userName : 'xxx',
    // commentText: 'xxx'
    // }
  };

  useEffect(() => {}, [commentStorage]);

  return (
    <div className={classes.root}>
      this is comments
      <CommentInput
        userName={userName}
        onSubmit={updataComments}
      ></CommentInput>
      <CommentList commentDetails={commentStorage}></CommentList>
    </div>
  );
};

export default CommentBox;

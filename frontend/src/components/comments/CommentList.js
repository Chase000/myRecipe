import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  commentBox: {
    margin: '5px',
    height: '300px',
    width: ' auto',
    border: '2px solid green',
  },

  commentDiv: {
    margin: '5px',
    height: '100px',
    width: ' auto',
    border: '1px solid red',
  },
}));

const CommentList = props => {
  const { commentDetails } = props;

  const classes = useStyles();
  return (
    <div className={classes.commentBox}>
      this is comments area
      {console.log(commentDetails)}
      {commentDetails.map((comment, index) => (
        <Card
          key={index}
          variant='outlined'
          raised={true}
          className={classes.commentDiv}
        >
          <CardContent>
            <Typography>{comment.commentUserName}:</Typography>
            <Typography>{comment.commentText}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;

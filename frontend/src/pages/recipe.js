import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedRecipe from '../components/Recipe/MainFeaturedRecipe';
import Sidebar from '../components/Recipe/Sidebar';

import api from '../utils/api';
import Navbar from '../layout/Navbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const buttonTheme = createTheme({
  palette: {
    primary: {
      light: '#ffeaff',
      main: '#fff0d5',
      dark: '#ccbea4',
      contrastText: '#444444',
    },
    secondary: {
      light: '#ffffba',
      main: '#efd689',
      dark: '#bba55b',
      contrastText: '#000000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiListItemText-root': {
      'font-family': `${('Bodoni Moda', 'serif')}`,
    },
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    'font-family': 'Newsreader, serif',
  },
  type: {
    margin: theme.spacing(4, 0, 2),
    'font-family': 'Newsreader, serif',
    'font-style': 'italic',
    'font-weight': '900',
  },
  creator: {
    margin: theme.spacing(2, 0, 1),
    'font-family': 'Newsreader, serif',
    'font-style': 'italic',
    'font-weight': '800',
  },
  'creator: hover': {
    color: 'hotpink',
    'text-decoration': 'underline',
    'background-color': 'hotpink',
    cursor: 'pointer',
  },
  content: {
    'font-family': 'Bodoni Moda, serif',
  },
  likeInfo: {
    margin: theme.spacing(0, 0, 5),
    'font-family': 'Bodoni Moda, serif',
    'font-weight': '300',
    'font-size': '1.5rem',
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  logInfo: {
    margin: theme.spacing(1, 0, 2),
    'font-family': 'Montserrat, sans-serif',
    'font-size': '1rem',
  },

  commentBox: {
    margin: '50px',
    height: '700px',
    width: ' 500px',
    border: '2px solid black',
  },
  commentInputBox: {
    margin: '5px',
    height: '300px',
    width: ' auto',
    border: '2px solid green',
  },
  commentShowBox: {
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

// const mainRecipeDetail = {
//   recipeName: 'Recipe Name',
//   id: '60cd4c0b8fa6062612c847fb',
//   userId: '60e3b8a0bda46e5a88134035',
//   modifiedDate: '2021-01-01',
//   modifiedTime: '21:21',
//   picture: 'https://source.unsplash.com/user/foodlovers_',
//   type: 'Meal-Type',
//   method:
//     'In a large pot or dutch oven, cook beef in oil over medium heat until brown. Dissolve bouillon in water and pour into pot. Stir in rosemary, parsley and pepper. Bring to a boil, then reduce heat, cover and simmer 1 hour.\n Stir potatoes, carrots, celery, and onion into the pot. Dissolve cornstarch in 2 teaspoons cold water and stir into stew. Cover and simmer 1 hour more.',
//   ingredients: [
//     ' cubed beef stew meat',
//     'vegetable oil',
//     'beef bouillon, crumbled',
//   ],
//   favorites_num: 5,
//   isPrivate: false,
//   createrName: 'Allen Burden',
// };

const mainRecommendationList = [
  {
    method: [
      'Wash hands with soap and water.',
      'In a large skillet or saucepan, heat oil on medium heat.',
      'Add onion and celery and sauté until soft.',
      'Add the rest of the vegetables, broth, salt and pepper.',
      'Cover and simmer slowly for 30 minutes or until carrots and potatoes are tender.',
      'Refrigerate leftovers within 2 hours.',
    ],
    ingredients: [
      '1 Tablespoon vegetable oil',
      '1/2 cup diced onion (1/2 medium onion)',
      '2 stalks celery, chopped',
      '2 carrots, sliced in 2” sticks',
      '1 can (15 ounces) diced tomatoes, with juice',
      '1 medium potato, diced',
      '1 zucchini (sliced 1/4 inch thick)',
      '2 Tablespoons minced parsley',
      '1 cup broth (any type)',
      '1/2 teaspoon salt',
      '1/2 teaspoon pepper',
    ],
    favorites_IDs: [],
    commentsId: [],
    _id: '60eae152addee6f2c68dc24c',
    recipeName: 'Veggie Stew',
    type: 'Soups',
    isPrivate: false,
    picture:
      'https://firebasestorage.googleapis.com/v0/b/spiral-pics.appspot.com/o/images%2FVeggie%20Stew.png?alt=media&token=43c1b3cf-3390-469c-98ad-f09a81cae0e5',
    modifiedDate: '7/11/2021',
    modifiedTime: '10:17:22 PM',
    userId: '60ead04baddee6f2c68dc24b',
    __v: 0,
  },
];

export default function Recipe() {
  let { rUid } = useParams();
  // explorer Unique Id
  const eUId = localStorage.getItem('token_id');
  const history = useHistory();
  const classes = useStyles();
  const [recipe, setRecipe] = useState({});

  const [recommendations, setRecommendations] = useState([]);

  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  // handle delete comfirmation dialog
  const [alertOpen, setAlertOpen] = React.useState(false);

  useEffect(() => {
    getCommentsDetails();
  }, []);

  useEffect(() => {
    getLikedDetail();
  }, []);

  useEffect(() => {
    getMainRecipe();
  }, []);

  useEffect(() => {
    getSimilarRecipes();
  }, []);

  //  get recipe detail
  const getMainRecipe = async () => {
    const res = await api.get(`/recipeCardDetail/${rUid}`);
    const data = res.data.recipeCardDetail[0];
    // console.log(data);
    setRecipe(data);
    setComments(data.comments);
    setLikedNum(data.favorites_IDs.length);
  };

  // get like status set the liked state and like number
  const getLikedDetail = async () => {
    if (eUId) {
      try {
        const res = await api.get(`/getLikeStatus/${rUid}/${eUId}`);
        // console.log(res.data);
        setLiked(res.data.liked);
        setLikedNum(res.data.likeNum);
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  };

  // Get fresh comments box
  const getCommentsDetails = async () => {
    try {
      const res = await api.get(`/recipeCardDetail/${rUid}`);
      // console.log(res.data.recipeCardDetail[0].comments);
      setComments(res.data.recipeCardDetail[0].comments);
    } catch (err) {
      console.error(err);
    }
  };

  // get similar recommendations
  const getSimilarRecipes = async () => {
    try {
      const res = await api.get(`/similarRecipe/${rUid}`);
      // console.log(res);
      const data = res.data;
      if (data.length > 5) {
        setRecommendations(data.slice(0, 5));
      } else {
        setRecommendations(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // like interaction
  const handleUpLike = async () => {
    if (!eUId) {
      // console.log(eUId);
      history.push('/login');
    } else {
      try {
        const res = await api.put(`/changeLikeStatus/${rUid}/${eUId}`);
        console.log(res);
        getLikedDetail();
        getMainRecipe();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpNewComment = async commentText => {
    if (!rUid) {
      alert('Please Login and then post your comment!');
    }
    try {
      const res = await api.post('/comment', {
        comment_userId: eUId,
        comment_recipeId: rUid,
        content: commentText,
      });
      console.log(res);
      getCommentsDetails();
      setCommentText('');
    } catch (err) {
      console.error(err.message);
    }
    // const comment = { userName, commentText };
    // onSubmit(commentText);
  };
  const handleAlertClickOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDeleteComment = async commentId => {
    try {
      const res = await api.delete(`/comment/${commentId}`);
      console.log(res);
      getCommentsDetails();
      setAlertOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <div className={'my-3'}></div>
      <Container maxWidth='md'>
        <main>
          <MainFeaturedRecipe recipe={recipe} />
          {/* <Grid flex container spacing={10}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          <Grid container spacing={5} className={classes.mainGrid}>
            <>
              <Grid
                container
                direction='column'
                justifycontent='center'
                alignItems='center'
              ></Grid>
              <Grid item xs={12} md={8}>
                <Typography variant='h3' className={classes.title} gutterBottom>
                  {recipe.recipeName}
                </Typography>
                <Button
                  style={{ marginBottom: '0.5rem' }}
                  onClick={handleUpLike}
                >
                  {liked ? (
                    <FavoriteIcon color='secondary' />
                  ) : (
                    <FavoriteBorderIcon color='secondary' />
                  )}
                </Button>{' '}
                <span className={classes.likeInfo}>
                  {/* {recipe.favorites_IDs.length} */}
                  {likedNum}
                </span>
                <Divider />
                <Button>
                  <Link
                    variant='h6'
                    className={classes.creator}
                    href={`/profile/${recipe.userId}`}
                    color='inherit'
                  >
                    @{recipe.userName}
                  </Link>
                </Button>
                <Divider />
                <Typography variant='h5' className={classes.type} gutterBottom>
                  Meal type: {recipe.type}
                </Typography>
                <Divider />
                <Typography variant='h4' className={classes.title} gutterBottom>
                  Ingredients:
                </Typography>
                <List>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => (
                      <ListItem key={index}>
                        <Typography variant='h6' className={classes.content}>
                          {ingredient}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography variant='h4' className={classes.title} gutterBottom>
                  Methods:
                </Typography>
                <List>
                  {recipe.method &&
                    recipe.method.map((item, idx) => (
                      <ListItem key={idx} variant='h6'>
                        <Typography variant='h6' className={classes.content}>
                          {item}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
                {/* <Divider />
                <Divider />
                <Divider /> */}
                {/* {eUId ? (
                  <Paper style={{ padding: '35px 15px 5px', marginTop: 10 }}>
                    <TextField
                      variant='outlined'
                      label='Comment Here!'
                      multiline
                      fullWidth
                      placeholder='Please leave your commment'
                      rows={3}
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                    />

                    <Button
                      style={{ marginTop: 10, fontWeight: '900' }}
                      color='primary'
                      onClick={e => handleUpNewComment(commentText)}
                    >
                      Submit
                    </Button>
                  </Paper>
                ) : (
                  <Paper style={{ padding: '35px 15px', marginTop: 10 }}>
                    <Button>
                      <Typography className={classes.content}>
                        <Link href={'/login'}>Login</Link>
                      </Typography>
                    </Button>
                    <span variant='h6' className={classes.logInfo}>
                      to share your thought
                    </span>
                  </Paper>
                )}
                {comments.map(
                  (comment, index) =>
                    comment.commentContent && (
                      <Paper
                        key={index}
                        style={{ padding: '40px 20px', marginTop: 10 }}
                      >
                        <Grid container wrap='nowrap' spacing={2}>
                          <Grid justifycontent='left' item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: 'left' }}>
                              {comment.commentUserName}
                            </h4>
                            <Typography style={{ textAlign: 'left' }}>
                              {comment.commentContent}
                            </Typography>
                            <p style={{ textAlign: 'left', color: 'gray' }}>
                              posted 1 minute ago
                            </p>
                            {eUId === comment.commentUserId ? (
                              <Button
                                onClick={e =>
                                  handleDeleteComment(comment.commentId)
                                }
                                style={{ float: 'right' }}
                              >
                                Delete
                              </Button>
                            ) : (
                              <> </>
                            )}
                          </Grid>
                        </Grid>
                      </Paper>
                    )
                )} */}
              </Grid>
            </>
            <Sidebar recommendations={recommendations} />
          </Grid>

          <Divider />
          <Divider />
          {eUId ? (
            <Paper style={{ padding: '35px 15px 5px', marginTop: 10 }}>
              <TextField
                variant='outlined'
                label='Comment Here!'
                multiline
                fullWidth
                placeholder='Please leave your commment'
                rows={3}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />

              <Button
                style={{ marginTop: 10, fontWeight: '900' }}
                color='primary'
                onClick={e => handleUpNewComment(commentText)}
              >
                Submit
              </Button>
            </Paper>
          ) : (
            <Paper style={{ padding: '35px 15px', marginTop: 10 }}>
              <Button>
                <Typography className={classes.content}>
                  <Link href={'/login'}>Login</Link>
                </Typography>
              </Button>
              <span variant='h6' className={classes.logInfo}>
                to share your thought
              </span>
            </Paper>
          )}
          {comments.map(
            (comment, index) =>
              comment.commentContent && (
                <Paper
                  key={index}
                  style={{ padding: '40px 20px', marginTop: 10 }}
                >
                  <Grid container wrap='nowrap' spacing={2}>
                    <Grid justifycontent='left' item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: 'left' }}>
                        {comment.commentUserName}
                      </h4>
                      <Typography style={{ textAlign: 'left' }}>
                        {comment.commentContent}
                      </Typography>
                      <p style={{ textAlign: 'left', color: 'gray' }}>
                        {`${comment.commentModifiedTime} ${comment.commentModifiedDate} `}
                      </p>
                      {eUId === comment.commentUserId ? (
                        <>
                          <Button
                            // onClick={e => handleDeleteComment(comment.commentId)}
                            onClick={handleAlertClickOpen}
                            style={{ float: 'right' }}
                          >
                            Delete
                          </Button>
                          <Dialog
                            open={alertOpen}
                            onClose={handleAlertClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                          >
                            <DialogTitle id='alert-dialog-title'>
                              {'Delete Confirm'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id='alert-dialog-description'>
                                Do you want to delete this comment?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleAlertClose}
                                color='primary'
                              >
                                Disagree
                              </Button>
                              <Button
                                onClick={() =>
                                  handleDeleteComment(comment.commentId)
                                }
                                color='secondary'
                                autoFocus
                              >
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      ) : (
                        <> </>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              )
          )}
          <Divider />
          <Divider />
          <Divider />
        </main>
      </Container>
    </React.Fragment>
  );
}

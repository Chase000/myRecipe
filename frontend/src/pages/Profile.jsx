import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '../components/RegisterAndLogin/Typography';
import Navbar from '../layout/Navbar';
import getServerDatas from '../components/fetchFunc';
import { Box, Container, Grid, Button } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import '../components/account/ProfileForm.css';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '24px',
  },

  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },

  title: {
    color: theme.palette.primary.light,
  },

  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
  },

  profileContainer: {
    marginTop: '10px',
  },

  nameCardContainer: {
    height: '1e',
  },

  nameCard: {
    height: '100%',
  },

  my_2: {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '25px',
  },

  my_3: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  img: {
    height: '200px',
    width: 'auto',
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: '500',
  },
  type: {
    'font-family': 'Newsreader, serif',
    'font-style': 'italic',
    'font-weight': '900',
  },
}));

const EditProfile = prop => {
  const history = useHistory();
  const classes = useStyles();
  const visitId = prop.match.params.userId;
  const userId = localStorage.getItem('token_id');
  const [profile, setProfile] = useState({});
  const [profiles, setProfiles] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [avatarName, setAvatarName] = useState('');
  const [recipeCards, setRecipeCards] = useState([]);
  const [followList, setFfollowList] = useState([]);
  const [followedList, setFfollowedList] = useState([]);
  const [ifFollow, setIifFollow] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  useEffect(() => {
    if (visitId === userId) {
      setIsUser(true);
    }
    getProfile(visitId);
    getProfiles(visitId);
    getFollowList(userId);
    getFollowedList(userId);
  }, []);

  useEffect(() => {
    handleFollowStateChange();
  }, [followList]);

  useEffect(() => {}, [ifFollow]);

  const getProfile = async userId => {
    const data = await getServerDatas(`/editProfile/${userId}`, 'GET', null);
    const avatarName = `${data.name.split(' ')[0][0]}${
      data.name.split(' ')[1][0]
    }`;
    setProfile(data);
    setAvatarName(avatarName);
  };

  const handleAlertClickOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const getProfiles = async userId1 => {
    if (visitId === userId) {
      const ifUser = true;
      const data = await getServerDatas(
        `/myProfile/${userId1}/${ifUser}`,
        'GET',
        null
      );
      console.log(data);
      setProfiles(data);
      setRecipeCards(data.recipes);
    } else {
      const ifUser = false;
      const data = await getServerDatas(
        `/myProfile/${userId1}/${ifUser}`,
        'GET',
        null
      );
      console.log(data);
      setProfiles(data);
      setRecipeCards(data.recipes);
    }
    // const data = await getServerDatas(`/myProfile/${userId}/${ifUser}`, 'GET', null);
    // setProfiles(data);
    // setRecipeCards(data.recipes);
  };

  const getFollowList = async userId => {
    const data = await getServerDatas(`/followList/${userId}`, 'GET', null);
    setFfollowList(data);
  };

  const getFollowedList = async userId => {
    const data = await getServerDatas(`/followedList/${userId}`, 'GET', null);
    setFfollowedList(data);
  };

  const handleFollowStateChange = () => {
    followList.forEach(v => {
      if (v.followUserId === visitId) {
        setIifFollow(true);
      } else {
        setIifFollow(false);
      }
    });
  };

  const handleEdieRecipe = recipeId => {
    history.push(`/recipe/${recipeId}/edit`);
  };

  const handleDeleteRecipe = async rId => {
    try {
      await getServerDatas(`/recipe/${rId}`, 'DELETE', null);
      getProfiles(rId);
      window.location = `/profile/${visitId}`;
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewRecipe = recipeId => {
    history.push(`/recipe/${recipeId}/view`);
  };

  const handleFollow = async () => {
    if (userId) {
      const data = await getServerDatas(
        `/changeFollowStatus/${visitId}/${userId}`,
        'PUT',
        null
      );
      window.location = `/profile/${visitId}`;
    } else {
      history.push('/login');
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Box className='login'>
        <Box className='background-overlay'>
          <div className={classes.my_3}></div>
          <Container className={classes.profileContainer} maxWidth='lg'>
            <Box className='profile-container'>
              <React.Fragment>
                <Container maxWidth='lg'>
                  <AccountProfile
                    avatarName={avatarName}
                    userProfile={profile}
                    isUser={isUser}
                    userProfiles={profiles}
                    ifFollow={ifFollow}
                    handleFollow={handleFollow}
                    followList={followList}
                    followedList={followedList}
                  />
                </Container>
              </React.Fragment>
            </Box>
            <Box className='container-yourRecipe'>
              <React.Fragment>
                <div className={classes.my_2}>
                  {isUser ? (
                    <Typography className={classes.content} variant='h4'>
                      My Recipes
                    </Typography>
                  ) : (
                    <Typography className={classes.content} variant='h4'>
                      Author's Recipes
                    </Typography>
                  )}
                </div>
                <Container maxWidth='lg'>
                  <Grid container spacing={4}>
                    {recipeCards.map((card, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card className='card' raised={true}>
                          <CardActionArea href={`/recipe/${card._id}/view`}>
                            <CardMedia
                              className='card-media'
                              title='Image title'
                            />
                            <CardContent className='card-content'>
                              <Typography
                                className={classes.content}
                                variant='h5'
                              >
                                {card.recipeName}
                                {/* {recipe} */}
                              </Typography>
                              <CardMedia
                                className={classes.media}
                                image={card.picture}
                                title='dish'
                              />
                              <Typography className={classes.type} variant='h6'>
                                {card.type}
                              </Typography>
                            </CardContent>
                          </CardActionArea>

                          <CardActions>
                            {isUser ? (
                              <>
                                <Button
                                  color='primary'
                                  fullWidth
                                  variant='contained'
                                  size='small'
                                  onClick={() => handleEdieRecipe(card._id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color='secondary'
                                  fullWidth
                                  variant='contained'
                                  size='small'
                                  // onClick={() => handleDeleteRecipe(card._id)}
                                  onClick={handleAlertClickOpen}
                                >
                                  DELETE
                                </Button>
                                <Dialog
                                  open={alertOpen}
                                  onClose={handleAlertClose}
                                  aria-labelledby='alert-dialog-title'
                                  aria-describedby='alert-dialog-description'
                                >
                                  <DialogTitle id='alert-dialog-title'>
                                    {'Operation Confirm'}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                      Do you want to delete this recipe?
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
                                        handleDeleteRecipe(card._id)
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
                              <Button
                                color='primary'
                                fullWidth
                                variant='contained'
                                size='small'
                                onClick={() => handleViewRecipe(card._id)}
                              >
                                Details
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </React.Fragment>
            </Box>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default EditProfile;

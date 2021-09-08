import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '../components/RegisterAndLogin/Typography';
import Navbar from '../layout/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import getServerDatas from '../components/fetchFunc';
import image from '../img/recipe2.jpeg';
import recipe from '../img/recipe1.jpeg';
import { Box, Container, Grid } from '@material-ui/core';
import UsersDetails from '../components/account/UsersDetails';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import '../components/ProfileForm.css';

const cards = [1, 2, 3];
const useStyles = makeStyles(theme => ({
  root: {
    //   display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '24px',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
}));
const tileData = [
  {
    img: image,
    title: 'avatar_5',
    author: 'author',
  },
  {
    img: image,
    title: 'avatar_5',
    author: 'author',
  },
  {
    img: image,
    title: 'avatar_5',
    author: 'author',
  },
  {
    img: image,
    title: 'avatar_5',
    author: 'author',
  },
];

const UsersProfile = () => {
  const history = useHistory();
  const classes = useStyles();
  const userId = localStorage.getItem('token_id');
  const [profile, setProfile] = React.useState({});

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  const getProfile = async userId => {
    const data = await getServerDatas(`/profile/${userId}`, 'GET', null);
    console.log(data);
    setProfile(data);
    console.log(profile);
    return data;
  };

  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin(isShowLogin => !isShowLogin);
  };
  const handleSub = async newValues => {
    // getServerDatas(`/profile/${userId}`, "PUT", newValues);
    // console.log(newValues);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Box className='login'>
        <Box className='background-overlay'>
          <Container className={classes.profileContainer} maxWidth='lg'>
            <Box className='profile-container'>
              <React.Fragment>
                <Container maxWidth='lg'>
                  <Grid container spacing={1}>
                    <Grid item lg={12} md={8} xs={12}>
                      <UsersDetails />
                      {/*</Grid>*/}
                      {/*/!*<Grid item lg={8} md={6} xs={12}>*!/*/}
                      {/*/!*    <AccountProfileDetails*!/*/}
                      {/*/!*        userProfile={profile}*!/*/}
                      {/*/!*        handleLoginClick={handleLoginClick}*!/*/}
                      {/*/!*        handleSubmit={handleSub}*!/*/}
                      {/*/!*    />*!/*/}
                    </Grid>
                  </Grid>
                </Container>
              </React.Fragment>
            </Box>
            <Box className='container-yourRecipe'>
              <React.Fragment>
                <Container maxWidth='lg'>
                  <Grid container spacing={4}>
                    {cards.map(card => (
                      <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className='card' raised={true}>
                          <CardMedia
                            className='card-media'
                            title='Image title'
                          />
                          <CardContent className='card-content'>
                            <Typography variant='h5' component='h2'>
                              Recipe{card}
                            </Typography>
                            <img src={recipe} alt='title' />
                            <Typography>
                              This is a brief description of the recipe.
                            </Typography>
                            <div>
                              following<Link>(123)</Link>
                              likes<Link>(123)</Link>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </React.Fragment>
            </Box>
            {/* <Box className='container-guessYouLike'>
          <React.Fragment>
            <Container maxWidth='lg'>
            <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className='card' raised={true} >
                        <CardMedia
                            className='card-media'
                            title="Image title"
                        />
                        <CardContent className='card-content'>
                            <Typography variant="h5" component="h2">
                            Heading
                            </Typography>
                            <Typography>
                            This is a media card. You can use this section to describe the content.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="sm" color="primary">
                            View
                            </Button>
                            <Button size="sm" color="primary">
                            Edit
                            </Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
          </Box> */}
            {/* <Box className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
                {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                        <StarBorderIcon className={classes.title} />
                        </IconButton>
                    }
                    />
                </GridListTile>
                ))}
            </GridList>
          </Box> */}
          </Container>
        </Box>
      </Box>
      {/* <Button onClick={handleLoginClick} >click</Button> */}
      {/* <div className="App">
        <EditProfileForm isShowLogin={isShowLogin} />
      </div> */}
    </React.Fragment>
  );
};

export default UsersProfile;

import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar/Navbar';
import getServerDatas from '../components/fetchFunc';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import '../components/account/ProfileForm.css';

import FollowingList from '../components/account/subComponents/FollowingList';
import api from '../utils/api';

const cards = [1, 2, 3];
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

  nameCardContainer: {
    height: '1e',
  },

  nameCard: {
    height: '100%',
  },
}));

const ProfileFollowing = prop => {
  const history = useHistory();
  const classes = useStyles();
  // const visitId = prop.match.params.userId;
  const userId = localStorage.getItem('token_id');
  const [profile, setProfile] = useState({});
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  // useEffect(() => {
  //   getUserInformation(userId);
  // }, [userId]);

  // const getUserInformation = async userId => {
  //   const data = await api.get(`myProfile/${userId}`);
  //   console.log(data);
  //   // setRecipe(data);

  //   return data;
  // };

  const getProfile = async userId => {
    const data = await getServerDatas(`/editProfile/${userId}`, 'GET', null);
    console.log(data);
    setProfile(data);
    return data;
  };

  return (
    <React.Fragment>
      <Navbar />
      <Box className='login'>
        <Box className='background-overlay'>
          <div className='my-3'></div>
          <Container className={classes.profileContainer} maxWidth='lg'>
            <Box className='profile-container'>
              <React.Fragment>
                <Container maxWidth='lg'>
                  {isUser ? (
                    <Grid container spacing={1}>
                      <Grid
                        className={classes.nameCardContainer}
                        item
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <AccountProfile
                          className={classes.nameCard}
                          userProfile={profile}
                        />
                      </Grid>
                      <Grid item lg={8} md={6} xs={12}>
                        <AccountProfileDetails userProfile={profile} />
                      </Grid>
                    </Grid>
                  ) : (
                    <AccountProfile />
                  )}
                </Container>
              </React.Fragment>
            </Box>
            <Box>
              <React.Fragment>
                <div className='my-2'>
                  <h2 className='textCenter'>My following</h2>
                </div>
                <Container maxWidth='lg'>
                  <FollowingList></FollowingList>
                </Container>
              </React.Fragment>
            </Box>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ProfileFollowing;

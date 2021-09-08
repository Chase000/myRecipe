import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Container, Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Navbar from './Navbar';
import Divider from '@material-ui/core/Divider';
import exampleUpdateRecipes from '../exampleData/exampleUpdateRecipes';
import exampleTopLikedRecipes from '../exampleData/exampleTopLikedRecipes';
import CardOfLandingPage from '../components/Landing/cardOfLandingPage';
import api from '../utils/api';

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(1),
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: '500',
  },
  updateBox: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    backgroundColor: 'inherit',
  },
  topLikedBox: {
    marginTop: theme.spacing(5),
    backgroundColor: 'inherit',
  },

  recipeTitle: {
    margin: theme.spacing(1),
    'font-family': 'Newsreader, serif',
    // 'font-family': 'Bodoni Moda, serif',
    // 'font-weight': '500',
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem('token');
  const eUId = localStorage.getItem('token_id');
  const [updateRecipes, setUpdateRecipes] = useState([]);
  const [topLikedRecipes, setTopLikedRecipes] = useState([]);

  useEffect(() => {
    history.push('/');
  }, [token]);

  useEffect(() => {
    getTopLikedRecipesArr();
  }, []);
  useEffect(() => {
    if (eUId) {
      console.log(eUId);
      getUpdateRecipes();
    }
  }, []);

  const getTopLikedRecipesArr = async () => {
    try {
      const res = await api.get('/likeSortedRecipes');
      // console.log(res);
      setTopLikedRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUpdateRecipes = async () => {
    try {
      const res = await api.get(`/followRecommendation/${eUId}`);
      console.log(res);
      setUpdateRecipes(res.data);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      {token ? (
        updateRecipes.length > 0 ? (
          <Container className={classes.topLikedBox} maxWidth='lg'>
            <Typography className={classes.title} variant='h4'>
              Subscriptions
            </Typography>

            <Grid container direction='row' spacing={3}>
              {updateRecipes.map((recipe, index) => (
                <Grid item xs={3} key={index}>
                  <Paper>
                    <CardOfLandingPage
                      recipeDetail={recipe}
                    ></CardOfLandingPage>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Divider />
            <Divider />
          </Container>
        ) : (
          <Container className={classes.topLikedBox} maxWidth='lg'>
            <Typography className={classes.title} variant='h5'>
              There is no updates for your subscription
            </Typography>
          </Container>
        )
      ) : (
        <>
          <Container className={classes.topLikedBox} maxWidth='lg'>
            <Typography className={classes.title} variant='h5'>
              Please Login to check your subscription
            </Typography>
          </Container>
        </>
      )}

      <Container className={classes.topLikedBox} maxWidth='lg'>
        <Typography className={classes.title} variant='h4'>
          What's On Top
        </Typography>

        <Grid container direction='row' spacing={3}>
          {topLikedRecipes &&
            topLikedRecipes.map((recipe, index) => (
              <Grid item xs={3} key={index}>
                <Paper>
                  <CardOfLandingPage recipeDetail={recipe}></CardOfLandingPage>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Landing;

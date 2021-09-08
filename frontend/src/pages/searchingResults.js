import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Container, Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Navbar from '../layout/Navbar';
import Divider from '@material-ui/core/Divider';
import CardOfTopLikes from '../components/searching/cardOfTopLikes';
import api from '../utils/api';
import CardOfSearchingResults from '../components/searching/cardOfSearchingResults';

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

const SearchingResults = () => {
  const classes = useStyles();
  const history = useHistory();
  let { kWords } = useParams();

  const [searchingResults, setSearchingResults] = useState([]);
  const [topLikedRecipes, setTopLikedRecipes] = useState([]);

  useEffect(() => {
    getsearchingResults();
  }, [kWords]);

  useEffect(() => {
    getTopLikedRecipesArr();
  }, [kWords]);

  const getsearchingResults = async () => {
    try {
      const res = await api.get(`/search/${kWords}`);
      // console.log(
      //   res.data
      //     .sort(function (a, b) {
      //       return a.matchNum - b.matchNum;
      //     })
      //     .reverse()
      // );
      if (res.data) {
        const searchingResultsWithMatchingSort = res.data
          .sort(function (a, b) {
            return a.matchNum - b.matchNum;
          })
          .reverse();
        setSearchingResults(searchingResultsWithMatchingSort);
      } else {
        setSearchingResults(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTopLikedRecipesArr = async () => {
    try {
      const res = await api.get('/likeSortedRecipes');
      // console.log(res);
      setTopLikedRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      {searchingResults.length > 0 ? (
        <Container className={classes.topLikedBox} maxWidth='lg'>
          <Typography className={classes.title} variant='h4'>
            Searching Results of '{kWords}'
          </Typography>

          <Grid container direction='row' spacing={3}>
            {searchingResults.map((recipe, index) => (
              <Grid item xs={4} key={index}>
                <Paper>
                  <CardOfSearchingResults
                    recipeDetail={recipe}
                  ></CardOfSearchingResults>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Divider />
        </Container>
      ) : (
        <>
          <Container className={classes.topLikedBox} maxWidth='lg'>
            <Typography className={classes.title} variant='h4'>
              There is no matching results for {kWords}
            </Typography>
            <Typography className={classes.title} variant='h4'>
              Check these Top-liked recipes!
            </Typography>

            <Grid container direction='row' spacing={3}>
              {topLikedRecipes &&
                topLikedRecipes.map((recipe, index) => (
                  <Grid item xs={3} key={index}>
                    <Paper>
                      <CardOfTopLikes recipeDetail={recipe}></CardOfTopLikes>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default SearchingResults;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  mainFeaturedRecipe: {
    padding: 180,
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  mainFeaturedRecipeContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedRecipe(props) {
  const classes = useStyles();
  const { recipe } = props;

  return (
    <>
      <Paper
        className={classes.mainFeaturedRecipe}
        style={{
          height: '100%',
          backgroundImage: `url(${
            recipe.picture || 'https://source.unsplash.com/random'
          })`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: 'none' }}
            src={recipe.picture}
            alt={'picture of main recipe'}
          />
        }
        <div className={classes.overlay} />
        {/* <Grid container>
          <Grid item md={9}>
            <div className={classes.mainFeaturedRecipeContent}>
              <Typography
                component='h1'
                variant='h2'
                color='inherit'
                gutterBottom
              >
                {recipe.recipeName}
              </Typography>
              <Link
                variant='h5'
                color='inherit'
                href={`/profile/${recipe.userId}`}
              >
                <Typography variant='h5' color='inherit' paragraph>
                  @{recipe.createrName}
                </Typography>
              </Link>
            </div>
          </Grid>
        </Grid> */}
      </Paper>
    </>
  );
}

MainFeaturedRecipe.propTypes = {
  recipe: PropTypes.object,
};

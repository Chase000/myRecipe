import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RecipeCard from './RecipeCard';

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    margin: theme.spacing(1),
    backgroundColor: 'inherit',
  },

  title: {
    margin: theme.spacing(1),
    'font-family': 'Newsreader, serif',
    // 'font-family': 'Bodoni Moda, serif',
    // 'font-weight': '500',
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { recommendations } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography className={classes.title} variant='h6' gutterBottom>
          Guess You May Like...
        </Typography>
      </Paper>
      {recommendations.map((item, index) => {
        return <RecipeCard recipeDetail={item} key={index}></RecipeCard>;
      })}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};

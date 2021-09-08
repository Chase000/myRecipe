import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import api from '../../utils/api';

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
}));

export default function Main(props) {
  const classes = useStyles();
  // explorer Unique Id
  const eUId = localStorage.getItem('token_id');
  const { recipe } = props;

  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(0);

  useEffect(() => {
    getLikedDetails();
  }, []);

  const getLikedDetails = async () => {
    const res = await api.get(`/getLikeStatus/${recipe._id}/${eUId}`);
    console.log(res);
  };

  return (
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
        <Button>
          <FavoriteIcon color='secondary' />
        </Button>
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
      </Grid>
    </>
  );
}

Main.propTypes = {
  recipe: PropTypes.object,
  title: PropTypes.string,
};

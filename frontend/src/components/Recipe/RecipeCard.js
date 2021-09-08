import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const styles = {
  card: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  media: {
    height: 200,
  },
  title: {
    fontFamily: 'Newsreader, serif',
  },
  type: {
    fontFamily: 'Newsreader, serif',
    fontStyle: 'italic',
    fontWeight: '900',
  },
  likeNumber: {
    fontFamily: 'Newsreader, serif',
    fontWeight: '500',
    color: '#f77343',
  },
};

const RecipeCard = props => {
  return (
    <Card style={styles.card} raised>
      <CardActionArea href={`/recipe/${props.recipeDetail.id}/view`}>
        <CardMedia
          style={styles.media}
          image={props.recipeDetail.picture}
          title={props.recipeDetail.recipeName}
        />

        <CardContent>
          <Typography style={styles.title} variant='h5'>
            {props.recipeDetail.recipeName}
          </Typography>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item xs={9}>
              <Typography style={styles.type} variant='subtitle1'>
                {props.recipeDetail.type}
              </Typography>
            </Grid>
          </Grid>

          {/* <Typography variant='caption'>
            {props.recipeDetail.likeNum}
          </Typography>
          <span> likes</span> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;

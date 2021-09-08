import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import api from '../../utils/api';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 10,
    borderRadius: 5,
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
    fontWeight: '300',
  },
  likeInfo: {
    marginLeft: '0.8rem',
    'font-family': 'Bodoni Moda, serif',
    'font-weight': '300',
    'font-size': '1rem',
  },

  creator: {
    fontFamily: 'Newsreader, serif',
    fontStyle: 'italic',
    fontWeight: '900',
  },
  actions: {
    'justify-content': 'flex-end',
  },
  buttons: {
    hover: false,
    marginRight: 0,
    paddingBottom: '0.5rem',
  },
}));

const CardOfSearchingResults = props => {
  const history = useHistory();
  const classes = useStyles();
  const [creatorName, setCreatorName] = useState('');
  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(props.recipeDetail.likeNum);
  const eUId = localStorage.getItem('token_id');

  useEffect(() => {
    getCreatorName();
    getLikedDetail();
  }, []);

  const getCreatorName = async () => {
    try {
      const res = await api.get(`user/${props.recipeDetail.userId}`);

      setCreatorName(res.data.name);
    } catch (err) {
      console.error(err);
    }
  };

  // get like status set the liked state and like number
  const getLikedDetail = async () => {
    if (eUId) {
      // console.log(eUId);
      // console.log(props.recipeDetail.userId);

      try {
        const res = await api.get(
          `/getLikeStatus/${props.recipeDetail._id}/${eUId}`
        );
        // console.log(res.data);
        setLiked(res.data.liked);
        setLikedNum(res.data.likeNum);
      } catch (err) {
        console.error(err);
      }
    } else {
      setLiked(false);
    }
  };

  // like interaction
  const handleUpLike = async () => {
    if (!eUId) {
      // console.log(eUId);
      history.push('/login');
    } else {
      try {
        const res = await api.put(
          `/changeLikeStatus/${props.recipeDetail._id}/${eUId}`
        );
        // console.log(res);
        getLikedDetail();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card className={classes.card} raised>
      <Tooltip title={`click to browse ${props.recipeDetail.recipeName}`}>
        <CardActionArea href={`/recipe/${props.recipeDetail._id}/view`}>
          <CardMedia
            className={classes.media}
            image={props.recipeDetail.picture}
            title={props.recipeDetail.recipeName}
          />

          <CardContent>
            <Typography className={classes.title} variant='h6'>
              {props.recipeDetail.recipeName}
            </Typography>
            <Grid
              container
              direction='row'
              justifycontent='space-between'
              alignItems='center'
            >
              <Grid item xs={9}>
                <Typography className={classes.creator} variant='subtitle1'>
                  {creatorName}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Tooltip>
      <CardActions className={classes.actions}>
        <span>
          <Tooltip title={`click to ${liked ? 'unlike' : 'like'}`}>
            <Button className={classes.buttons} onClick={handleUpLike}>
              {liked ? (
                <FavoriteIcon color='secondary' />
              ) : (
                <FavoriteBorderIcon color='secondary' />
              )}
              <span className={classes.likeInfo}>
                {/* {recipe.favorites_IDs.length} */}
                {`  ${likedNum}`}
              </span>
            </Button>
          </Tooltip>
        </span>
      </CardActions>
    </Card>
  );
};

export default CardOfSearchingResults;

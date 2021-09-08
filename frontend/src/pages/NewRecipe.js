import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import tsIcon from '../img/recipe1.jpeg';
import Chip from '@material-ui/core/Chip';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const useStyles = makeStyles(theme => ({
  root: {
    //   display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '24px',
  },

  profileContainer: {
    marginTop: '10px',
    border: '1px solid black',
  },
  inner1: {
    margin: '15px 15px 10px 10px',
    border: '1px solid black',
    padding: '10px',
    backgroundColor: 'yellow',
  },

  innerTop: {
    margin: '15px 15px 10px 10px',
    border: '1px solid black',
    padding: '10px',
    // backgroundColor : 'red',
    display: 'flex',
  },

  innerMid: {
    margin: '15px 15px 10px 10px',
    border: '1px solid black',
    padding: '10px',
    // backgroundColor : 'red',
    display: 'flex',
  },

  innerBottom: {
    margin: '15px 15px 10px 10px',
    border: '1px solid green',
    padding: '10px',
    // backgroundColor: "red",
    display: 'flex',
  },

  img: {
    margin: '15px 15px 10px 10px',
    border: '1px solid black',
    padding: '10px',
    // backgroundColor : 'black',
    background: `url(${tsIcon}) no-repeat`,
    width: '300px',
    height: '170px',
    // background: 'url(\'./img/avatar_5.png\') no-repeat center center/cover',
  },

  recipeNumber: {
    margin: '15px 15px 10px 10px',
    border: '1px solid black',
    padding: '5px',
    height: '170px',
    // backgroundColor : 'orange',
  },

  content: {
    margin: '5px 5px 10px 10px',
    border: '1px solid black',
    padding: '5px',
    display: 'flex',
    // backgroundColor : 'pink',
  },
}));
const NewRecipe = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar />
      <Box className='login'>
        <Box className='background-overlay'>
          <Container className={classes.profileContainer} maxWidth='lg'>
            <Box className='profile-container'>
              <React.Fragment>
                <Container className={classes.innerTop} maxWidth='lg'>
                  <Container className={classes.img}></Container>
                  <Container className={classes.recipeNumber}>
                    <Container className={classes.content}>
                      <h3>Recipe Name : </h3>{' '}
                      <TextField
                        required
                        id='standard-required'
                        defaultValue='Enter Recipe Name'
                      />
                    </Container>
                    <Container className={classes.content}>
                      <h3>Recipe Number :</h3>
                      <TextField
                        required
                        id='standard-required'
                        defaultValue='Enter Recipe Number'
                      />
                    </Container>
                    <Container className={classes.content}>
                      <h3>Meal Type :</h3>
                      <TextField
                        required
                        id='standard-required'
                        defaultValue='Enter Recipe Type'
                      />
                    </Container>
                  </Container>
                </Container>
                <Container className={classes.innerMid} maxWidth='lg'>
                  <h3>Ingredients : </h3>
                  <br />
                  <div>
                    <Chip
                      icon={<ControlPointIcon></ControlPointIcon>}
                      clickable
                      label='Add Ingredient'
                      variant='outlined'
                      color='primary'
                    />
                  </div>
                </Container>
                <Container className={classes.innerBottom} maxWidth='lg'>
                  <Typography variant='h5' color='textSecondary' gutterBottom>
                    Mathods：
                  </Typography>
                  <Container>
                    <h4>Step 1:</h4>
                    <TextField
                      id='outlined-multiline-static'
                      //   label="Multiline"
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue='Please Enter the Method description'
                    />
                    <h4>Step 2:</h4>
                    <TextField
                      id='outlined-multiline-static'
                      //   label="Multiline"
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue='Please Enter the Method description'
                    />
                    <h4>Step 3:</h4>
                    <TextField
                      id='outlined-multiline-static'
                      //   label="Multiline"
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue='Please Enter the Method description'
                    />
                  </Container>
                </Container>
              </React.Fragment>
            </Box>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default NewRecipe;

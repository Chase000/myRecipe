import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import api from '../utils/api';
import FormButton from '../components/RegisterAndLogin/FormButton';
import TextField from '@material-ui/core/TextField';
// import Select from 'react-select';
import mealTypes from '../utils/mealTypes';
import Navbar from '../layout/Navbar';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';

import { storage } from '../utils/firebase';
import { createTheme } from '@material-ui/core/styles';
import {
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';

const buttonTheme = createTheme({
  palette: {
    primary: {
      light: '#ffeaff',
      main: '#fff0d5',
      dark: '#ccbea4',
      contrastText: '#444444',
    },
    secondary: {
      light: '#ffffba',
      main: '#efd689',
      dark: '#bba55b',
      contrastText: '#000000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px 30px',
    height: '100%',
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   // width: '50%',
    // },
    // '& .MuiContainer-maxWidthLg': {
    //   display: 'flex',
    //   direction: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    // },
  },
  Title: {
    fontFamily: 'Newsreader, serif',
  },
  form: {
    marginTop: theme.spacing(5),
    width: '80%',
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(2),
    borderRadius: 5,
  },
  smallButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: '0.8rem',
    fontWeight: '600',
    borderRadius: 10,
  },
  textField: {
    background: 'white',
    marginTop: theme.spacing(2),
  },
  imageShowBox: {
    width: '60%',
    direction: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgUploader: {
    width: '80%',
  },
}));

function EditRecipe() {
  // recipe Unique Id
  let { rUid } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [recipeDetail, setRecipeDetail] = useState({
    recipeName: 'Wontons',
    type: '',
    // ingredients: [
    //   'onion',
    //   'salt',
    //   'sugar',
    //   'cumin',
    //   'ginger',
    //   'pepper',
    //   'cinnamon',
    //   'cornstarch',
    //   'sesame oil',
    //   'chicken',
    //   'cabbage',
    //   'carrot',
    //   'wrappers',
    //   'egg',
    // ],
    // method: [
    //   'Combine spices, cornstarch, and oil in a large bowl.',
    //   'Add cooked meat and vegetables. Mix well.',
    //   'Place 1 tablespoon of mixture in the center of each wonton wrapper.',
    //   'Brush wrapper edges with water or egg white.',
    //   'Fold wrapper diagonally so corners line up, and press edges together to seal.',
    //   'Bring the side two corners together over the pouch of filling and pinch to close.',
    //   'Spray a steamer basket with nonstick spray. Add wontons so they do not touch. Cover and steam over simmering water for 6-7 minutes.',
    //   'Refrigerate leftovers within 2 hours.',
    // ],
    recipeName: '',
    type: '',
    method: ['', '', ''],
    ingredients: ['', '', ''],
    userId: localStorage.getItem('token_id'),
    picture: '',
    isPrivate: false,
  });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const [title, setTitle] = useState('Edit Recipe');

  const handleRecipePhotoChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRecipePhotoUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            console.log(url);
          });
      }
    );
  };

  useEffect(() => {
    // 没有菜谱id的情况下 就是创建
    if (rUid) {
      getRecipe(rUid);
    } else {
      setTitle('Create Recipe');
    }
  }, [rUid]);

  const getRecipe = async recipeId => {
    const res = await api.get(`/recipe/${recipeId}`);
    console.log(res.data);
    setRecipeDetail(res.data);
    setUrl(res.data.picture);
  };

  const handleSubmitForm = values => {
    console.log(values);
    if (rUid) {
      values.picture = url;
      console.log(values);
      return api
        .put(`/recipe/${rUid}`, values)
        .then(res => {
          console.log(res);
          history.push(`/recipe/${rUid}/view`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      values.picture = url;
      return api
        .post(`/recipe/${recipeDetail.userId}`, values)
        .then(res => {
          console.log(res);
          // const newRUId = res.data.recipeId;
          // should jump to the new recipe page
          // history.push(`/recipe/${newRUId}`);
          history.push(`/profile/${recipeDetail.userId}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <CssBaseline />

      <Container maxWidth='lg' className={classes.root}>
        <Typography
          className={classes.Title}
          variant='h3'
          gutterBottom
          marked='center'
          align='center'
        >
          {title}
        </Typography>
        <Container className={classes.imageShowBox} maxWidth='sm'>
          <img
            className={classes.imgUploader}
            src={
              url ||
              'https://firebasestorage.googleapis.com/v0/b/spiral-pics.appspot.com/o/images%2FIMG_9604.jpg?alt=media&token=efe9b246-e281-4787-bed9-5fb927e5c097'
            }
            alt='recipe'
          />
          <input type='file' onChange={handleRecipePhotoChange} />
          <button onClick={handleRecipePhotoUpload}>Upload Recipe Photo</button>
          <br />
          {progress !== 0 ? (
            <>
              <span>Uploading Progress 0%</span>
              <progress value={progress} max='100' />
              <span>100%</span>
            </>
          ) : (
            <></>
          )}

          {/* <br />
          {url}
          <br /> */}
        </Container>
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
        >
          <Form
            initialValues={recipeDetail}
            onSubmit={handleSubmitForm}
            subscription={{ submitting: true }}
            mutators={{
              ...arrayMutators,
            }}
            render={({
              handleSubmit,
              form: {
                mutators: { push, pop },
              }, // injected from final-form-arrays above})
            }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Box alignItems='center'>
                  <Grid
                    container
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='center'
                  >
                    <Field name='recipeName' margin='normal'>
                      {({ input }) => (
                        <TextField
                          className={classes.textField}
                          fullWidth
                          required
                          label='Recipe Name'
                          placeholder='Recipe Name'
                          type='text'
                          variant='outlined'
                          multiline
                          {...input}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Field label='Meal-Type' name='type' margin='normal'>
                      {({ input }) => (
                        <TextField
                          className={classes.textField}
                          fullWidth
                          select
                          label='Meal Type'
                          variant='outlined'
                          {...input}
                        >
                          {mealTypes.map(mealTypeValue => (
                            <MenuItem key={mealTypeValue} value={mealTypeValue}>
                              {mealTypeValue}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>

                  {/* commented meal type in text field  */}
                  {/* <div>
                <Field name='type' margin='normal'>
                  {({ input }) => (
                    <TextField
                      label='Meal Type'
                      placeholder='Meal Type'
                      type='text'
                      variant='outlined'
                      multiline
                      {...input}
                    />
                  )}
                </Field>
              </div> */}

                  {/* ingredients to array like bullet points */}

                  <Grid
                    container
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='center'
                  >
                    <FieldArray name='ingredients'>
                      {({ fields }) =>
                        fields.map((item, index) => (
                          <Field key={index} name={item} margin='normal'>
                            {({ input }) => (
                              <Grid container direction='row'>
                                <TextField
                                  fullWidth
                                  style={{ width: '85%' }}
                                  className={classes.textField}
                                  label={`Ingre #${index + 1}`}
                                  type='text'
                                  variant='outlined'
                                  {...input}
                                />
                                <span
                                  onClick={() => fields.remove(index)}
                                  style={{
                                    cursor: 'pointer',
                                    margin: 20,
                                  }}
                                >
                                  ❌
                                </span>
                              </Grid>
                            )}
                          </Field>
                        ))
                      }
                    </FieldArray>
                    <Grid
                      style={{ width: '60%' }}
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      spacing={1}
                    >
                      <Grid item xs={6}>
                        <ThemeProvider theme={buttonTheme}>
                          <FormButton
                            className={classes.smallButton}
                            color='primary'
                            type='button'
                            onClick={() => push('ingredients', undefined)}
                          >
                            Add ingredient
                          </FormButton>
                        </ThemeProvider>
                      </Grid>
                      <Grid item xs={6}>
                        <ThemeProvider theme={buttonTheme}>
                          <FormButton
                            className={classes.smallButton}
                            color='primary'
                            type='button'
                            onClick={() => pop('ingredients')}
                          >
                            Remove ingredient
                          </FormButton>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* method to array like bullet points */}
                  <Grid
                    container
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='center'
                  >
                    <FieldArray name='method'>
                      {({ fields }) =>
                        fields.map((item, index) => (
                          <Field key={index} name={item} margin='normal'>
                            {({ input }) => (
                              <Grid container direction='row'>
                                <TextField
                                  fullWidth
                                  className={classes.textField}
                                  style={{ width: '85%', marginBottom: '5px' }}
                                  label={`Method #${index + 1}`}
                                  type='text'
                                  variant='outlined'
                                  multiline
                                  {...input}
                                />
                                <span
                                  onClick={() => fields.remove(index)}
                                  style={{
                                    cursor: 'pointer',
                                    margin: 20,
                                  }}
                                >
                                  ❌
                                </span>
                              </Grid>
                            )}
                          </Field>
                        ))
                      }
                    </FieldArray>
                    <Grid
                      style={{ width: '60%' }}
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        <ThemeProvider theme={buttonTheme}>
                          <FormButton
                            className={classes.smallButton}
                            color='primary'
                            type='button'
                            onClick={() => push('method', undefined)}
                          >
                            Add method
                          </FormButton>
                        </ThemeProvider>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ThemeProvider theme={buttonTheme}>
                          <FormButton
                            className={classes.smallButton}
                            color='primary'
                            type='button'
                            onClick={() => pop('method')}
                          >
                            Remove method
                          </FormButton>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid>
                    <span>Private</span>
                    <Field name='isPrivate' type='checkbox' margin='normal'>
                      {({ input }) => (
                        <Checkbox
                          // onChange={handlePrivateChange}
                          variant='outlined'
                          {...input}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <FormButton
                      style={{ width: '40%' }}
                      type='submit'
                      className={classes.button}
                      color='secondary'
                    >
                      Submit
                    </FormButton>
                  </Grid>
                </Box>
              </form>
            )}
          ></Form>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default EditRecipe;

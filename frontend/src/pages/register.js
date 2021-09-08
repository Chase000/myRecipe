import withRoot from '../components/RegisterAndLogin/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Field, Form } from 'react-final-form';
import AppForm from '../components/RegisterAndLogin/AppForm';
import { email, required } from '../components/RegisterAndLogin/validation';
import RFTextField from '../components/RegisterAndLogin/RFTextField';
import FormButton from '../components/RegisterAndLogin/FormButton';
import Typography from '../components/RegisterAndLogin/Typography';
import api from '../utils/api';
import { useHistory } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    'background-color': 'rgba(255, 51, 102,0.85)',
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function Register() {
  const history = useHistory();
  const classes = useStyles();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const validate = values => {
    const errors = required(
      ['firstName', 'lastName', 'email', 'password'],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmitForm = values => {
    return api
      .post('/register', {
        ...values,
        name: `${values.firstName} ${values.lastName}`,
      })
      .then(res => {
        console.log(res.data.message);
        history.push('/login');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='register'>
        <div className='background-overlay'>
          <div className='register-inner'>
            <AppForm>
              <React.Fragment>
                <Typography
                  variant='h3'
                  gutterBottom
                  marked='center'
                  align='center'
                >
                  Sign Up
                </Typography>
                <Typography variant='body2' align='center'>
                  <Link href='/login' underline='always'>
                    Already have an account?
                  </Link>
                </Typography>
              </React.Fragment>
              <Form
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  password2: '',
                }}
                onSubmit={handleSubmitForm}
                subscription={{ submitting: true }}
                validate={validate}
                render={props => (
                  <form
                    onSubmit={props.handleSubmit}
                    className={classes.form}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Field
                          autoFocus
                          component={RFTextField}
                          autoComplete='fname'
                          fullWidth
                          placeholder='First name'
                          label='First name'
                          name='firstName'
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={RFTextField}
                          autoComplete='lname'
                          fullWidth
                          placeholder='Last name'
                          label='Last name'
                          name='lastName'
                          required
                        />
                      </Grid>
                    </Grid>
                    <Field
                      autoComplete='email'
                      component={RFTextField}
                      fullWidth
                      placeholder='Email'
                      label='Email'
                      margin='normal'
                      name='email'
                      required
                    />
                    <Field
                      fullWidth
                      component={RFTextField}
                      required
                      placeholder='Password'
                      name='password'
                      autoComplete='current-password'
                      label='Password'
                      type='password'
                      margin='normal'
                    />
                    <Field
                      fullWidth
                      component={RFTextField}
                      required
                      name='password2'
                      placeholder='Confirm your password'
                      autoComplete='current-password'
                      label='Confirm-Password'
                      type='password'
                      margin='normal'
                    />
                    <FormButton
                      className={classes.button}
                      disabled={props.submitting}
                      color='secondary'
                      fullWidth
                    >
                      {props.submitting ? 'In progress…' : 'Sign Up'}
                    </FormButton>
                  </form>
                )}
              ></Form>
            </AppForm>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRoot(Register);

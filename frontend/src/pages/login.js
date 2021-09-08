import withRoot from '../components/RegisterAndLogin/withRoot';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

function Login() {
  const history = useHistory();
  const classes = useStyles();

  const validate = values => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmitForm = values => {
    console.log(values);
    return api
      .post('/login', values)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('token_id', res.data.id);
        history.push('/');
        // window.location = '/';
      })
      .catch(err => {
        console.log(err);
        history.push('/login');
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='login'>
        <div className='background-overlay'>
          <div className='login-inner'>
            <AppForm>
              <React.Fragment>
                <Typography
                  variant='h3'
                  gutterBottom
                  marked='center'
                  align='center'
                >
                  Sign In
                </Typography>
                <Typography variant='body2' align='center'>
                  {'Not a member yet? '}
                  <Link href='/register' align='center' underline='always'>
                    Sign Up here
                  </Link>
                </Typography>
              </React.Fragment>
              <Form
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={handleSubmitForm}
                subscription={{ submitting: true }}
                validate={validate}
              >
                {({ handleSubmit, submitting }) => (
                  <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    noValidate
                  >
                    <Field
                      autoComplete='email'
                      autoFocus
                      placeholder='Email'
                      component={RFTextField}
                      disabled={submitting}
                      fullWidth
                      label='Email'
                      margin='normal'
                      name='email'
                      required
                      size='large'
                    />
                    <Field
                      fullWidth
                      size='large'
                      component={RFTextField}
                      disabled={submitting}
                      required
                      name='password'
                      placeholder='Password'
                      autoComplete='current-password'
                      label='Password'
                      type='password'
                      margin='normal'
                    />

                    <FormButton
                      className={classes.button}
                      disabled={submitting}
                      size='large'
                      color='secondary'
                      fullWidth
                    >
                      {submitting ? 'In progress…' : 'Sign In'}
                    </FormButton>
                  </form>
                )}
              </Form>
              <Typography align='center'>
                <Link
                  underline='always'
                  href='/premium-themes/onepirate/forgot-password/'
                >
                  Forgot password?
                </Link>
              </Typography>
            </AppForm>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRoot(Login);

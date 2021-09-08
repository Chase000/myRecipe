import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import api from '../../../utils/api';
import { useHistory } from "react-router-dom";
// import Alert from '@material-ui/lab/Alert';

const RegistrationForm = ({ userProfile }) => {
  const history = useHistory();
  const paperStyle = { padding: '0 15px 40px 15px', width: 250 };
  const btnStyle = { marginTop: 10 };
  console.log(userProfile);
  const [firstName, setFirstName] = React.useState(
    userProfile.name.split(' ')[0]
  );
  const [lasttName, setLastName] = React.useState(
    userProfile.name.split(' ')[1]
  );
  const [email, setEmail] = React.useState(userProfile.email);
  const [password, setPassword] = React.useState(userProfile.password);
  const userId = localStorage.getItem('token_id');
  //   const usrID = localStorage.getItem('token_id');
  const newValues = {
    name: `${firstName} ${lasttName}`,
    email: email,
    password: password,
  };

  const handleSubmit = newValues => {
    api
      .put(`/editProfile/${userId}`, newValues)
      .then(res => {
        if(res.status != 200) {
          console.log(res.data.message);

        } else {
          console.log(res);
          alert('profile update successful!');
          // history.push(`/profile/${userId}`);
          window.location = `/profile/${userId}`;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Formik initialValues={newValues}>
          {props => (
            <Form noValidate>

              <TextField
                name='FirstnName'
                label='FirstName'
                fullWidth
                defaultValue={userProfile.name.split(' ')[0]}
                onChange={e => setFirstName(e.target.value)}
                required
              />

              <TextField
                name='LastName'
                label='LastName'
                fullWidth
                defaultValue={userProfile.name.split(' ')[1]}
                onChange={e => setLastName(e.target.value)}
                required
              />

              <TextField
                name='email'
                label='Email'
                fullWidth
                helperText={<ErrorMessage name='email' />}
                defaultValue={userProfile.email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <TextField
                name='password'
                label='Password'
                fullWidth
                defaultValue={userProfile.password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <Button
                type='submit'
                style={btnStyle}
                variant='contained'
                color='primary'
                onClick={e => handleSubmit(newValues)}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default RegistrationForm;

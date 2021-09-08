import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import EditProfileForm from "../EditFrom";
import UpdateProfileForm from "./subComponents/UpdateProfileForm";

const flag_update = true;
const AccountProfileDetails = (props) => {
  console.log(props);
  const email = props.userProfile.email;
  const usrName = props.userProfile.name;
  console.log(usrName);
  const [values, setValues] = useState({
    userName: "",
    email: "",
  });
  const handleUp = (newValues) => {
    // handleSubmit( newValues);
  };
  const handleChange = (event) => {
    setValues({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {/* <div> User Name</div> */}
              <TextField
                label="Name"
                fullWidth
                disabled={flag_update}
                name="userName"
                onChange={handleChange}
                required
                value={usrName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <div> Email</div> */}
              <TextField
                label="Email"
                fullWidth
                disabled={flag_update}
                name="email"
                onChange={handleChange}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          {/* <Button fullWidth={true} color="primary" variant="contained">
            UPDATE DETAILS
          </Button> */}
          <EditProfileForm title="Edite Your Profile">
            <UpdateProfileForm
              userProfile={props.userProfile}
              // handleUpdate={handleUp}
            />
          </EditProfileForm>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;

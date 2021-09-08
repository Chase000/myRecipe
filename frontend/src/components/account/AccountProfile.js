import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import image from '../../img/Logo2.png';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MailIcon from '@material-ui/icons/Mail';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UpdateForm from './subComponents/UpdateProfileForm';
import getServerDatas from '../fetchFunc';
import PropTypes from 'prop-types';

const user = {
  avatar: image,
  name: 'Eddie Zed',
  beingLike: '50',
};
const avatarColors = ['green', '#fff0d5', 'orange', '#efd689'];
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  userDetails: {
    alignItems: 'flex',
    display: 'flex',
    flexDirection: 'row',
    margin: '9px 0px',
    wordSpacing: '10px',
  },

  avatar: {
    display: 'inline',
    height: '100px',
    width: '100px',
    marginRight: '50px',
    marginLeft: '100px',
    backgroundColor: `${
      avatarColors[Math.floor(Math.random() * avatarColors.length)]
    }`,
  },

  avaName: {
    // fontFamily: 'Bodoni Moda, serif',
    fontWeight: '500',
    fontSize: '55px',
    textAlign: 'centre',
    marginTop: '10px',
  },

  buttons: {
    alignSelf: 'bottom',
  },

  nameContent: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: '500',
    marginTop: '25px',
    marginRight: '30px',
    paddingLeft: '30px',
  },

  profileBox: {
    width: '40%',
    marginTop: '10px',
  },

  nameArea: {
    marginTop: '15px',
    marginLeft: '100px',
    display: 'flex',
  },

  num_beingLike: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: '500',
    alignItems: 'centre',
    marginLeft: '30px',
  },
  content: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: '400',
  },
}));

function AccountProfile(props) {
  const {
    avatarName,
    userProfile,
    isUser,
    userProfiles,
    ifFollow,
    handleFollow,
    followList,
    followedList,
  } = props;
  const userName = userProfile.name;
  const userEmail = userProfile.email;
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setType(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {}, [ifFollow]);

  const hadleJumpToUserProfile = (e, jumpToUserId) => {
    window.location = `/profile/${jumpToUserId}`;
  };

  const handleFollowCommponent = async (e, visitId, userId) => {
    const data = await getServerDatas(
      `/changeFollowStatus/${visitId}/${userId}`,
      'PUT',
      null
    );
    window.location = `/profile/${userId}`;
  };

  return (
    <Card {...props}>
      <CardContent>
        <Box className={classes.userDetails}>
          <Button>
            <Avatar className={classes.avatar}>
              <Typography className={classes.avaName}>{avatarName}</Typography>
            </Avatar>
          </Button>
          <Typography
            className={classes.nameContent}
            color='textPrimary'
            gutterBottom
            variant='h3'
          >
            {userName}
          </Typography>
          <Box className={classes.profileBox}>
            <Container className={classes.nameArea}>
              <ThumbUpIcon fontSize='large' />
              <Typography className={classes.num_beingLike} variant='h4'>
                {userProfiles.userLikedNum}
              </Typography>
            </Container>
            <Container className={classes.nameArea}>
              <MailIcon fontSize='large' />
              <Typography className={classes.num_beingLike} variant='h5'>
                {userEmail}
              </Typography>
            </Container>
          </Box>
        </Box>
      </CardContent>
      {isUser ? (
        <div>
          <Divider />
          <CardActions className={classes.buttons}>
            <Button
              color='primary'
              fullWidth
              variant='contained'
              onClick={handleClickOpen('following')}
            >
              {/* Following ({(userProfiles && userProfiles.followIds.length !== 0) ? followList.length : 0}) */}
              Following ({followList.length})
            </Button>
            <Button
              color='primary'
              fullWidth
              variant='contained'
              onClick={handleClickOpen('followers')}
            >
              Followers ({followedList.length})
            </Button>
            <Button
              color='primary'
              fullWidth
              variant='contained'
              onClick={handleClickOpen('editProfile')}
            >
              Edite Profile
            </Button>
            <div>
              {type === 'followers' ? (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullWidth
                  scroll={'paper'}
                  aria-labelledby='scroll-dialog-title'
                  aria-describedby='scroll-dialog-description'
                >
                  <DialogTitle id='scroll-dialog-title'>
                    Followers :
                  </DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText
                      id='scroll-dialog-description'
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <List dense className={classes.root}>
                        {followedList.length ? (
                          followedList.map((value, index) => {
                            console.log(followedList);
                            const labelId = `checkbox-list-secondary-label-${index}`;
                            return (
                              <>
                                {console.log(value)}
                                {value.followedUserName ? (
                                  <ListItem key={index}>
                                    <ListItemAvatar>
                                      <Avatar alt={`Avatar n°${index + 1}`}>
                                        {
                                          value.followedUserName.split(
                                            ' '
                                          )[0][0]
                                        }
                                      </Avatar>
                                    </ListItemAvatar>
                                    <Link
                                      component='button'
                                      onClick={e =>
                                        hadleJumpToUserProfile(
                                          e,
                                          value.followedUserId
                                        )
                                      }
                                    >
                                      <ListItemText
                                        id={labelId}
                                        primary={value.followedUserName}
                                      />
                                    </Link>
                                  </ListItem>
                                ) : null}
                              </>
                            );
                          })
                        ) : (
                          <Typography className={classes.content} variant='h5'>
                            There is no followers.
                          </Typography>
                        )}
                      </List>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : type === 'following' ? (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullWidth
                  scroll={'paper'}
                  aria-labelledby='scroll-dialog-title'
                  aria-describedby='scroll-dialog-description'
                >
                  <DialogTitle id='scroll-dialog-title'>
                    Following :
                  </DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText
                      id='scroll-dialog-description'
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <List dense className={classes.root}>
                        {followList.length ? (
                          followList.map((value, index) => {
                            const labelId = `checkbox-list-secondary-label-${index}`;
                            return (
                              <>
                                {value.followUserName ? (
                                  <ListItem key={index} button>
                                    <ListItemAvatar>
                                      <Avatar alt={`Avatar n°${value + 1}`}>
                                        {value.followUserName.split(' ')[0][0]}
                                      </Avatar>
                                    </ListItemAvatar>
                                    <Link
                                      component='button'
                                      onClick={e =>
                                        hadleJumpToUserProfile(
                                          e,
                                          value.followUserId
                                        )
                                      }
                                    >
                                      <ListItemText
                                        id={labelId}
                                        primary={value.followUserName}
                                      />
                                    </Link>
                                    <ListItemSecondaryAction>
                                      <Button
                                        variant='contained'
                                        color='secondary'
                                        onClick={e =>
                                          handleFollowCommponent(
                                            e,
                                            value.followUserId,
                                            userProfiles.userInformation._id
                                          )
                                        }
                                      >
                                        Unfollow
                                      </Button>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ) : null}
                              </>
                            );
                          })
                        ) : (
                          <Typography className={classes.content} variant='h5'>
                            You haven't followed anyone。
                          </Typography>
                        )}
                      </List>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={'paper'}
                  aria-labelledby='scroll-dialog-title'
                  aria-describedby='scroll-dialog-description'
                >
                  <DialogTitle id='scroll-dialog-title'>
                    Edite Your Profile
                  </DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText
                      id='scroll-dialog-description'
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <UpdateForm userProfile={props.userProfile} />
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardActions>
        </div>
      ) : ifFollow ? (
        <CardActions className={classes.buttons}>
          <Button
            color='primary'
            fullWidth
            variant='contained'
            onClick={handleFollow}
          >
            unFollow
          </Button>
        </CardActions>
      ) : (
        <CardActions className={classes.buttons}>
          <Button
            color='primary'
            fullWidth
            variant='contained'
            onClick={handleFollow}
          >
            Follow
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

AccountProfile.propTypes = {
  avatarName: PropTypes.string,
  userProfile: PropTypes.object,
  isUser: PropTypes.bool,
  userProfiles: PropTypes.object,
  ifFollow: PropTypes.bool,
  handleFollow: PropTypes.func,
  followList: PropTypes.array,
  followedList: PropTypes.array,
};

export default AccountProfile;

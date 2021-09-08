import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import logo from '../img/image2vector.svg';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    backgroundColor: alpha(theme.palette.action.active, 0.02),
  },
  logoText: {
    fontFamily: 'Newsreader, serif',
  },
  logoButton: {
    marginRight: theme.spacing(2),
    width: 180,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.secondary.light, 0.05),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.secondary.light, 0.15),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [searchingKeyWords, setSearchingKeyWords] = useState('');

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickProfile = event => {
    const userId = localStorage.getItem('token_id');
    // history.push(`/profile/${userId}`);
    window.location = `/profile/${userId}`;
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token_id');
    localStorage.removeItem('token');
    window.location = '/';
  };

  const handleRegister = () => {
    history.push('/register');
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleCreateRecipe = () => {
    const eUId = localStorage.getItem('token_id');
    if (eUId) {
      history.push('/recipe/create');
    } else {
      history.push('/login');
    }
  };

  const handleSearchInput = e => {
    setSearchingKeyWords(e.target.value);
  };

  const handleSearchAction = () => {
    if (searchingKeyWords) {
      history.push(`/search/${searchingKeyWords}`);
      // window.location = `/search/${searchingKeyWords}`;
    }
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {token ? (
        <div>
          <MenuItem onClick={handleLogout}>
            <Button color='inherit'>Log Out</Button>
          </MenuItem>
          <MenuItem onClick={handleClickProfile}>
            <IconButton
              aria-label='account of current user'
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleRegister}>
            <Button color='inherit'>Register</Button>
          </MenuItem>
          <MenuItem onClick={handleLogin}>
            <Button color='inherit'>Login</Button>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color='transparent' position='static'>
        <Toolbar>
          <Tooltip title={`Jump To Main Page `}>
            <IconButton
              href={'/'}
              edge='start'
              className={classes.logoButton}
              color='inherit'
              aria-label='logo'
            >
              <img alt='logo' src={logo} width='100%' />
              {/* <Typography className={classes.logoText} variant='h4'> */}
              {/* foodies.com */}
              {/* </Typography> */}
            </IconButton>
          </Tooltip>
          <Tooltip title={`Create a new Recipe! `}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              onClick={handleCreateRecipe}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.search}>
            <InputBase
              placeholder='Search Recipes…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
            />
            <IconButton
              className={classes.searchIcon}
              type='submit'
              aria-label='search'
              onClick={handleSearchAction}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {token ? (
              <>
                <Button onClick={handleLogout} color='inherit'>
                  Log Out
                </Button>
                <Tooltip title={`Check My Recipes and Profile `}>
                  <IconButton
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    onClick={handleClickProfile}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Button onClick={handleRegister} color='inherit'>
                  Register
                </Button>
                <Button onClick={handleLogin} color='inherit'>
                  Login
                </Button>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default Navbar;

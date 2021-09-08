import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FollowingList(prop) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleClickOpen = (scrollType) => () => {
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

  return (
    // <List dense className={classes.root}>
    //   {[0, 1, 2, 3, 4, 5, 6].map((value) => {
    //     const labelId = `checkbox-list-secondary-label-${value}`;
    //     return (
    //       <ListItem key={value} button >
    //         <ListItemAvatar>
    //           <Avatar
    //             alt={`Avatar n°${value + 1}`}
    //             // src={`/static/images/avatar/${value + 1}.jpg`}
    //           >
    //             GC
    //           </Avatar>
    //         </ListItemAvatar>
    //         <Link>
    //           <ListItemText id={labelId} primary={`User ${value + 1}`}/>
    //         </Link>
    //         <ListItemSecondaryAction>
    //           <Button variant="contained" color="secondary">
    //             Unfollow
    //           </Button>
    //         </ListItemSecondaryAction>
    //       </ListItem>
    //     );
    //   })}
    // </List>
    <div>
      <Dialog
    open={open}
    onClose={handleClose}
    fullWidth
    scroll={"paper"}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
  >
    <DialogTitle id="scroll-dialog-title">Followers :</DialogTitle>
    <DialogContent dividers={true}>
      <DialogContentText
        id="scroll-dialog-description"
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <List dense className={classes.root}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} button>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    // src={`/static/images/avatar/${value + 1}.jpg`}
                  >
                    LZ
                  </Avatar>
                </ListItemAvatar>
                <Link>
                  <ListItemText
                    id={labelId}
                    primary={`User ${value + 1}`}
                  />
                </Link>
              </ListItem>
            );
          })}
        </List>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
    </div>
    
  );
}

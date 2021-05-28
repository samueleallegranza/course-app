import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    dropdown: {
        color: "black",
        display: "flex",
        cursor: "pointer"
    },
    icon: {
        marginRight: "10px",
    }
}));

export default function SimplePopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        const cookies = new Cookies()
        cookies.remove('username', { path: '/' });
        cookies.remove('token', { path: '/' });
        cookies.remove('role', { path: '/' });
        console.log("LOGOUT!")
        window.location.reload();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <ExpandMoreIcon aria-describedby={id} variant="contained" color="primary" onClick={handleClick} />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                <Typography className={[classes.dropdown, classes.typography]} onClick={() => logout()}>
                    <PowerSettingsNewIcon className={classes.icon}/>
                    Logout
                </Typography>
            </Popover>
        </>
    );
}

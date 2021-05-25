import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from '../../../Login'

const useStyles = makeStyles({
    list: {
        width: '300px',
    },
    fullList: {
        width: 'auto',
        backgroundColor: 'var(--grayDark)'
    },
    drawer: {
        backgroundColor: 'var(--grayDark)',
        minHeight: '100%',
        width: 250,
        color: 'var(--grayLight)'
    },
    icon: {
        color: 'var(--grayLight)'
    }
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const { isAuthenticated } = useAuth0();
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        event.preventDefault()
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };
    const [openAdm, setOpenAdm] = React.useState(false);
    const handleOpenAdm = () => {
        setOpenAdm(!openAdm);
    };
    const [openCad, setOpenCad] = React.useState(false);
    const handleOpenCad = () => {
        setOpenCad(!openCad);
    };
    
    const admin = () => (
        <>
            <ListItem button onClick={handleOpenAdm}>
                <ListItemText primary="Administração" />
                {openAdm ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAdm} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <Link to="/edicao">
                    <ListItem button key="edicao">
                        <ListItemIcon><EditIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Editar textos" />
                    </ListItem>
                </Link>
                    <Link to="/doacoes">
                    <ListItem button key="doacoesCadastradas">
                        <ListItemIcon><ListAltIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Doações Cadastradas" />
                    </ListItem>
                    </Link>
                    <Link to="/familias">
                    <ListItem button key="familiasCadastradas">
                        <ListItemIcon><SupervisorAccountIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Familias Cadastradas" />
                    </ListItem>
                    </Link>
                </List>
            </Collapse>
            <Divider />
        </>
    )

    const list = () => (
        <div className={classes.drawer}
            role="presentation"
        > <br />
            <LoginButton />
            <List>
            <Link to="/">
                <ListItem button key="inicio">
                    <ListItemIcon><HomeIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary="Início" />
                </ListItem>
            </Link>
            </List>
            <Divider />
            <ListItem button onClick={handleOpenCad}>
                <ListItemText primary="Cadastros" />
                {openCad ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCad} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link to="/cadastro/doacao">
                    <ListItem button key="doacao">
                        <ListItemIcon><PostAddIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Doação" />
                    </ListItem>
                  </Link>
                    <Link to="/cadastro/familia">
                      <ListItem button key="familia">
                          <ListItemIcon><GroupAddIcon className={classes.icon}/></ListItemIcon>
                          <ListItemText primary="Família" />
                      </ListItem>
                    </Link>
                    
                </List>
            </Collapse>
            <Divider />
            {isAuthenticated ? admin() : null}
            <List>
            <Link to="/ofertas">
                <ListItem button key="melhorOferta">
                    <ListItemIcon><AttachMoneyIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary="Melhor Oferta!" />
                </ListItem>
            </Link>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key='right'>
                <Button onClick={toggleDrawer(true)}><MenuIcon className={classes.icon}/></Button>
                <Drawer anchor='right' open={state} onClose={toggleDrawer(false)} >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
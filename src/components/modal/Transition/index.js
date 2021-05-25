import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid var(--secondary)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
  },
}));

const Button = styled.button`
    width: 150px;
    height: 40px;
    position: relative;
    border-radius: 5px;
    outline: none;
    border: 2px solid ${({ color }) => color? color : '#56CCF2'};
    background-color: ${({ color }) => color? color : '#56CCF2'};
    color: var(--white);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-weight: bold;
    cursor: pointer;
    left: 50%;
    margin: 10px;
    margin-top: 20px;
    transition: opacity 1;

    &:hover,
      &:focus {
        box-shadow: none;
      }
`;

const Icon = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    outline: none;
    border: 2px solid ${({ color }) => color? color : '#56CCF2'};
    background-color: ${({ color }) => color? color : '#56CCF2'};
    color: var(--white);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 1;

    &:hover,
      &:focus {
        box-shadow: none;
      }
`;

export default function TransitionsModal({children, displayName, color}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {displayName === 'edit' ? <Icon color={color} type="button" onClick={handleOpen}><EditIcon/></Icon>
        : displayName === 'delete' ? <Button color={color} type="button" onClick={handleOpen}>Excluir</Button>
        : <button>{displayName}</button>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
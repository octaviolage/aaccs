import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { ProjectCardContainer } from '../../Carousel/ProjectCard';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Paper = styled.div`
    background-color: var(--white);
    border: 2px solid var(--secondary);
    box-shadow: 0.5;
    padding: 0px 15px 0px;
    border-radius: 10px;
    width: 80%;
    max-width: 800px;
    max-height: 90%;
    overflow: 'auto';

    @media (max-width: 800px) {
        overflow-y: scroll;
        width: 95%;
    }
`;

Paper.Title = styled.h2`
    color: var(--secondary);
`;

Paper.Image = styled.img`
    display: block;
    margin: auto;
    border-radius: 5px;
`;

Paper.Text = styled.p`
    font-weight: normal;
    font-style: normal;
`;

const texto = "Lorem ipsum massa elit quisque phasellus class suspendisse per, aptent adipiscing scelerisque commodo primis in pellentesque netus dictum, a curabitur egestas aenean quisque est viverra. nunc eu euismod arcu morbi suscipit convallis donec sagittis vehicula consectetur, tempor et eros curabitur varius tortor sit class himenaeos, elit convallis quam lacus lacinia dolor vivamus non convallis.\n tempus sed mauris aenean suspendisse nibh laoreet metus nunc, semper convallis pulvinar phasellus hendrerit ad fames per aenean, elementum urna auctor tellus nunc eu imperdiet. etiam justo egestas faucibus quisque posuere morbi viverra lobortis, molestie purus nostra pulvinar quisque molestie quam, metus tempor nisi gravida purus blandit integer.\n Blandit ut tempus netus ornare himenaeos aliquam diam quam nunc, at curae suscipit etiam lacus senectus dictumst luctus, ultrices commodo leo neque lacus posuere et augue. phasellus mi taciti blandit enim nibh sit \n\n\npharetra malesuada sem faucibus habitasse faucibus hac, eget curae pretium curabitur massa quis tristique ad tempor habitant semper. adipiscing curabitur mi eros curabitur vulputate torquent nisi donec ut magna, eu potenti gravida amet orci nullam id aliquam senectus mi blandit, magna pharetra metus luctus dictumst laoreet justo ante porttitor. mattis lacinia ac lorem rutrum class cubilia curae sed magna gravida, aenean turpis blandit hac bibendum a facilisis scelerisque porttitor vivamus, eros ultricies nostra integer aenean tristique duis quisque aliquet."

export default function ProjectModal({ title, imagePath, text }) {
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
      <ProjectCardContainer 
        type="button" 
        onClick={handleOpen}
        url={imagePath}
        style={{ borderColor: 'var(--primary)' }}
        title={title}>
            <span style={{ color: 'white' }}>{title}</span>
        </ProjectCardContainer>
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
          <Paper>
            <Paper.Title>{title}</Paper.Title>
            <Paper.Image alt={title} src={imagePath}/>
            <Paper.Text>{text}</Paper.Text>
            <Paper.Text>{texto}</Paper.Text>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
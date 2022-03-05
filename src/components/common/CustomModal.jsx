import { Modal, Box, Typography } from '@mui/material';
import { ColorButton } from '.';
import PropTypes from 'prop-types';

const CustomModal = ({ text, onClick, isModalOpen }) => {
  const boxStyle = {
    position: 'absolute',
    top: '50%',
    width: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F8F0E9',
    borderRadius: '2px',
    padding: '23px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const innerBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 197,
    marginBottom: '20px',
    bgcolor: 'white',
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={onClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Box sx={innerBoxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text}
          </Typography>
        </Box>
        <ColorButton
          onClick={onClick}
          color={'white'}
          bgColor="#015B30"
          hoverBgColor="#015B30"
          sx={{
            height: '40px',
            width: '90%',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          variant="contained"
          width={'100%'}
          height={'56px'}
          text="확인"
        />
      </Box>
    </Modal>
  );
};
export default CustomModal;

Modal.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

import { Modal, Box, Typography } from '@mui/material';
import { ColorButton } from '.';
import PropTypes from 'prop-types';

const CustomModal = ({
  text,
  image,
  btnText,
  onClick,
  isModalOpen,
  isBackClick,
}) => {
  const boxStyle = {
    position: 'absolute',
    top: '50%',
    width: '90%',
    maxWidth: '320px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#F8F0E9',
    borderRadius: '5px',
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
      onClose={isBackClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Box sx={innerBoxStyle}>
          <img src={image} style={{ width: '100%', height: '100%' }} />
        </Box>
        <ColorButton
          onClick={onClick}
          color={'white'}
          bgColor="#015B30"
          hoverBgColor="#037A41"
          sx={{
            height: '40px',
            width: '90%',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          variant="contained"
          width={'100%'}
          height={'56px'}
          text={btnText}
        />
      </Box>
    </Modal>
  );
};
export default CustomModal;

Modal.propTypes = {
  text: PropTypes.string,
  btnText: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
  isModalOpen: PropTypes.bool,
  isBackClick: PropTypes.func,
};

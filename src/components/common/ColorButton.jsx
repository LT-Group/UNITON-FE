import { Button } from '@mui/material';
import PropTypes from 'prop-types';
const ColorButton = ({ color, bgColor, hoverBgColor }) => {
  return (
    <Button
      onClick={() => setIsModalOpen(false)}
      sx={{
        color: color,
        backgroundColor: bgColor,
        height: '40px',
        '&:hover': {
          backgroundColor: hoverBgColor,
        },
      }}
      variant="contained"
    >
      확인
    </Button>
  );
};
ColorButton.propTypes = {
  //객체를 가진 배열을 proptype로 받음
  color: PropTypes.string,
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
};
export default ColorButton;

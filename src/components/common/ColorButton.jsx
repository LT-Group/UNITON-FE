import { Button } from '@mui/material';
import PropTypes from 'prop-types';
const ColorButton = ({
  color,
  bgColor,
  hoverBgColor,
  text,
  width,
  height,
  fontSize,
  ...props,
}) => {
  console.log(props);
  return (
    <Button
    onClick={props.onClick?props.onClick:()=>{}}
      sx={{
        ...props.sx,
        color: color,
        backgroundColor: bgColor,
        width: width,
        height: height,
        '&:hover': {
          backgroundColor: hoverBgColor,
        },
      }}
      variant="contained"
    >
      {text}
    </Button>
  );
};
ColorButton.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  hoverBgColor: PropTypes.text,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
};
export default ColorButton;


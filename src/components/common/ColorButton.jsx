import { BloodtypeTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
const ColorButton = ({
  color = 'white',
  bgColor = '#015B30',
  hoverBgColor = '#015B30',
  text,
  width = '100%',
  height = 56,
  fontSize = '12px',
  borderRadius = '4px',
  variant = 'contained',
  ...props
}) => {
  return (
    <Button
      onClick={props.onClick ? props.onClick : () => {}}
      sx={{
        ...props.sx,
        color: color,
        backgroundColor: bgColor,
        width: width,
        height: height,
        borderRadius: borderRadius,
        '&:hover': {
          backgroundColor: hoverBgColor,
        },
        variant: { variant },
      }}
    >
      {text}
    </Button>
  );
};
ColorButton.propTypes = {
  color: PropTypes.string,
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.number,
};
export default ColorButton;

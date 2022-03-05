import React from 'react';
import { styled } from '@mui/material/styles';
// components
import {
  ColorButton,
  Container,
  CustomizedButtons,
} from '../src/components/common';
// mui
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Modal,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// recoil
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';

const SignUpPage = () => {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    console.log(e);
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#F8F0E9',
    borderRadius: '2px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const innerBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 197,
    marginBottom: '20px',
    bgcolor: 'white',
  };

  return (
    <Container>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <Typography sx={{ fontSize: '20px' }} fontWeight="600">
            마춤뻡에서 살아남기
          </Typography>
          <Typography sx={{ fontSize: '20px' }} fontWeight="600">
            입학
          </Typography>
        </div>
        <TextField
          id="id"
          InputProps={{
            classes: {
              input: cssstyle.resize,
            },
          }}
          placeholder="아이디(10자 이내)"
          type="string"
          autoComplete="current-id"
          onChange={handleChange}
          variant="standard"
          InputLabelProps={{ shrink: false }}
        />
        <TextField
          id="password"
          InputProps={{
            classes: {
              input: cssstyle.resize,
            },
          }}
          size="10px"
          sx={{ padding: '5px 0' }}
          placeholder="비밀번호 6자리 이상"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={handleChange}
          InputLabelProps={{ shrink: false }}
        />
        <TextField
          error={true}
          id="password"
          helperText="Incorrect entry."
          sx={{ padding: '5px 0' }}
          placeholder="비밀번호 재입력"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          variant="standard"
          onChange={handleChange}
          InputLabelProps={{ shrink: false }}
          InputProps={{
            style: { fontSize: 12, paddingBottom: '15px' },
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <style>{cssstyle}</style>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            width: `calc(100% - 4.8rem)`,
            paddingBottom: '2rem',
          }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{ backgroundColor: 'green', height: '40px' }}
            variant="contained"
          >
            회원가입
          </Button>
          <Button sx={{ color: 'green', height: '40px' }} variant="text">
            다음에 하기
          </Button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Box sx={innerBoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              입학을 축하드립니다.
            </Typography>
          </Box>
          <ColorButton
            onClick={() => setIsModalOpen(false)}
            color={'white'}
            bgColor={'green'}
            hoverBgColor="green"
            sx={{
              height: '40px',
              width: '90%',
            }}
            variant="contained"
          >
            확인
          </ColorButton>
        </Box>
      </Modal>
    </Container>
  );
};

export default SignUpPage;

const cssstyle = `
.MuiFormHelperText-root{
  margin-top:-1.2rem;
}
`;

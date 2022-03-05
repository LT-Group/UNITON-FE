import React, { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
// components
import { Container, ColorButton } from '../src/components/common';
// mui
// recoil
import { useRecoilState } from 'recoil';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const LoginPage = () => {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState({ password: true });
  const handleChange = (e) => {
    console.log(e);
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container bgColor={'#F8F0E9'}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
          지금은
          <br />
          마춤뻡에서 살아남기
          <br />
          등교시간
        </Typography>
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            id="id"
            placeholder="아이디를 입력해주세요."
            type="string"
            autoComplete="current-id"
            InputProps={{
              style: { fontSize: 14, paddingBottom: '20px' },
            }}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{ shrink: false }}
          />
          <TextField
            sx={{ marginTop: '24px', color: '#A9A69E', borderColor: '#A9A69E' }}
            id="password"
            InputProps={{
              style: {
                fontSize: 14,
                paddingBottom: '20px',
              },
            }}
            placeholder="비밀번호를 입력해주세요."
            type={isVisible.password ? 'text' : 'password'}
            autoComplete="current-password"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              style: { fontSize: 14, paddingBottom: '15px' },
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setIsVisible((isVisible) => ({
                        ...isVisible,
                        password: !isVisible.password,
                      }))
                    }
                    onMouseDown={() =>
                      setIsVisible((isVisible) => ({
                        ...isVisible,
                        password: !isVisible.password,
                      }))
                    }
                  >
                    {isVisible?.password ? (
                      <Visibility style={{ width: '18px' }} />
                    ) : (
                      <VisibilityOff style={{ width: '18px' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
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
          <ColorButton
            fontSize="14px"
            color="white"
            bgColor={'#015B30'}
            hoverBgColor={'#015B30'}
            variant="contained"
            width={'100%'}
            height={'56px'}
            text="로그인"
          />
          <Link href="/signup">
            <Button sx={{ color: '#015B30', height: '56px' }} variant="text">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

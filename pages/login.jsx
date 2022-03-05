import React, { useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
// components
import { Container, ColorButton } from '../src/components/common';
// mui
import { TextField, Button, Typography } from '@mui/material';
// recoil
import { useRecoilState } from 'recoil';

const LoginPage = () => {
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });
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
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: false }}
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
            color="white"
            bgColor={'green'}
            hoverBgColor={'green'}
            variant="contained"
          >
            로그인
          </ColorButton>
          <Link href="/signup">
            <Button sx={{ color: 'green', height: '40px' }} variant="text">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

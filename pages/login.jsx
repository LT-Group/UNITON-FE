import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
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
import { postApi } from '../apis';
import { setCookie, COOKIE_OPTION } from '../token/TokenManager';
import moment from 'moment';
import { useRouter } from 'next/router';
const LoginPage = () => {
  const router = useRouter();
  const [isPC, setIsPC] = useState(true);
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
  });
  const [isVisible, setIsVisible] = useState({ password: false });
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };
  const [isFocus, setIsFocus] = useState({
    id: false,
    password: false,
  });
  const handleLogin = async () => {
    if (
      inputData.id.length < 11 &&
      inputData.id.length > 0 &&
      inputData.password.length > 6
    ) {
      const isValid = await setToken();
      if (isValid) {
        // 쿠키 설정 완료
        setCookie('isLoading', false);
        router.replace('/');
      } else {
        alert('사용자 정보가 유효하지 않습니다.');
      }
    } else {
      alert('아이디/비밀번호를 확인해주세요.');
    }
  };

  const setToken = async () => {
    // 토큰 발급 진행중
    setCookie('isLoading', true);
    const date = moment();
    const token = await postApi.login({
      username: inputData.id,
      password: inputData.password,
    });

    if (!token.refresh) {
      return false;
    }
    const acexpireAt = new Date();
    acexpireAt.setDate(acexpireAt.getDate() + 2);

    const rfExpireAt = new Date();
    rfExpireAt.setDate(rfExpireAt.getDate() + 8);

    localStorage.setItem('userName', inputData.id);
    setCookie('isLogin', true, {
      path: '/',
      ...COOKIE_OPTION,
      expires: rfExpireAt,
    });

    setCookie('accessToken', token.access, {
      path: '/',
      ...COOKIE_OPTION,
      expires: acexpireAt,
    });
    setCookie('refreshToken', token.refresh, {
      path: '/',
      ...COOKIE_OPTION,
      expires: rfExpireAt,
    });
    setCookie('acexpireAt', date.add(1, 'days').format('yyyy-MM-DD HH:mm:ss'), {
      path: '/',
      ...COOKIE_OPTION,
      expires: acexpireAt,
    });
    setCookie('rfExpireAt', date.add(7, 'days').format('yyyy-MM-DD HH:mm:ss'), {
      path: '/',
      ...COOKIE_OPTION,
      expires: rfExpireAt,
    });
    return true;
  };

  let filter =
    'win16|win32|win64|wince|mac|macintel|macppc|mac68k|linux i686|linux armv7l|hp-ux|sunos';
  useEffect(() => {
    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        setIsPC(false);
      }
    }
  }, []);

  return (
    <Container bgColor={'#F8F0E9'}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Typography
          sx={{ fontSize: '28px', fontWeight: 'bold', lineHeight: '33.6px' }}
        >
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
            onFocus={() => setIsFocus({ ...isFocus, id: true })}
            onBlur={() => setIsFocus({ ...isFocus, id: false })}
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
            onFocus={() => setIsFocus({ ...isFocus, password: true })}
            onBlur={() => setIsFocus({ ...isFocus, password: false })}
            placeholder="비밀번호를 입력해주세요."
            type={isVisible.password ? 'text' : 'password'}
            autoComplete="current-password"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              style: {
                fontSize: 14,
                paddingBottom: '20px',
                marginBottom: '100px',
              },
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
        <BtnContainer isBlur={!isFocus.id && !isFocus.password} isPC={isPC}>
          <ColorButton
            sx={{ fontSize: '16px', fontWeight: 'bold' }}
            color="white"
            bgColor={'#015B30'}
            hoverBgColor={'#015B30'}
            variant="contained"
            width={'100%'}
            height={'56px'}
            text="로그인"
            onClick={handleLogin}
          />

          <Link href="/signup" passHref>
            <Button
              sx={{
                width: '100%',
                color: '#015B30',
                height: '56px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              variant="text"
            >
              회원가입
            </Button>
          </Link>
        </BtnContainer>
      </div>
    </Container>
  );
};

export default LoginPage;

const BtnContainer = styled.div`
  position: ${(props) => (props.isBlur || props.isPC ? 'fixed' : 'relative')};
  bottom: 2rem;
  margin-bottom: ${(props) => (props.isBlur || props.isPC ? '0' : '2rem')};
  ${(props) =>
    props.isBlur || props.isPC
      ? css`
          @media screen and (min-width: 480px) {
            width: 432px;
            margin: 0 auto;
          }
          @media screen and (max-width: 480px) {
            width: calc(100% - 4.8rem);
            margin: 0 auto;
          }
        `
      : css`
          width: 100%;
        `};
`;

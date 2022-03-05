import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
// components
import { ColorButton, Container, CustomModal } from '../src/components/common';
// mui
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// recoil
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';
import { postApi } from '../apis';
// moment
import moment from 'moment';
// cookie
import { setCookie, COOKIE_OPTION } from '../token/TokenManager';

const SignUpPage = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
    password_check: '',
  });
  const [isVisible, setIsVisible] = useState({
    password: false,
    password_check: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormatOkay, setIsFormatOkay] = useState({
    id: null,
    password: null,
  });
  const handleSignUp = async () => {
    if (isFormatOkay.id === null) {
      alert('아이디 중복 검사를 해주세요');
    } else if (
      inputData.id.length < 11 &&
      inputData.id.length > 0 &&
      inputData.password.length > 6 &&
      isFormatOkay.id &&
      isFormatOkay.password
    ) {
      const result = await postApi.signup({
        username: inputData.id,
        password: inputData.password,
      });
      console.log(result);
      if (!result) {
        setToken();
        // 쿠키 설정 완료
        setCookie('isLoading', false);
        setIsModalOpen(true);
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } else {
      alert('아이디/비밀번호를 다시 확인해주세요.');
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
  };

  const handleCheckID = async () => {
    const { result } = await postApi.checkID({ id: inputData.id });
    if (result) {
      setIsFormatOkay({ ...isFormatOkay, id: true });
    } else {
      setIsFormatOkay({ ...isFormatOkay, id: true });
    }
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
    console.log(e);
    if (e.target.id === 'password_check') {
      e.target.value.length > 0 && e.target.value !== inputData.password
        ? setIsFormatOkay({ ...isFormatOkay, password: false })
        : setIsFormatOkay({ ...isFormatOkay, password: true });
    }
  };
  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  const gotoHome = () => {
    setIsModalOpen(false);
    router.replace('/');
  };

  return (
    <Container bgColor={'#F8F0E9'}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div style={{ marginBottom: '60px' }}>
          <Typography
            sx={{ fontSize: '28px', lineHeight: '33.6px' }}
            fontWeight="bold"
          >
            마춤뻡에서 살아남기
            <br />
            입학
          </Typography>
        </div>
        <div style={{ width: '100%' }}>
          <TextField
            error={
              isFormatOkay.id || isFormatOkay.id === null
                ? inputData.id.length > 8
                  ? true
                  : false
                : true
            }
            helperText={
              isFormatOkay.id || isFormatOkay.id === null
                ? inputData.id.length > 8
                  ? '8자 이내로 입력해주세요'
                  : ''
                : '*중복된 아이디입니다.'
            }
            sx={{ width: '100%' }}
            id="id"
            InputProps={{
              classes: {
                input: cssstyle.resize,
              },
              style: { fontSize: 14, paddingBottom: '20px' },
            }}
            placeholder="아이디 (8자 이내)"
            type="string"
            autoComplete="current-id"
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{ shrink: false }}
          />
          <ColorButton
            color="white"
            bgColor="#015B30"
            hoverBgColor="#015B30"
            onClick={handleCheckID}
            variant="contained"
            width={'80px'}
            sx={{ position: 'absolute', right: 24, fontSize: '12px' }}
            height={'30px'}
            text="중복 확인"
          />
        </div>
        <TextField
          id="password"
          sx={{ marginTop: '24px' }}
          placeholder="비밀번호 (6자 이상)"
          error={
            inputData.password.length < 6 && inputData.password.length > 0
              ? true
              : false
          }
          helperText={
            inputData.password.length < 6 && inputData.password.length > 0
              ? '6자 이상 입력해주세요.'
              : ''
          }
          type={isVisible.password ? 'text' : 'password'}
          autoComplete="current-password"
          variant="standard"
          onChange={handleChange}
          InputLabelProps={{ shrink: false }}
          InputProps={{
            style: { fontSize: 14, paddingBottom: '20px' },
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
        <TextField
          id="password_check"
          error={
            isFormatOkay.password || isFormatOkay.password === null
              ? false
              : true
          }
          helperText={
            isFormatOkay.password || isFormatOkay.password === null
              ? ''
              : '*비밀번호가 일치하지 않습니다.'
          }
          sx={{ marginTop: '24px' }}
          placeholder="비밀번호 재입력 (6자 이상)"
          type={isVisible.password_check ? 'text' : 'password'}
          variant="standard"
          onChange={handleChange}
          InputLabelProps={{ shrink: false }}
          InputProps={{
            style: { fontSize: 14, paddingBottom: '20px' },
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setIsVisible((isVisible) => ({
                      ...isVisible,
                      password_check: !isVisible.password_check,
                    }))
                  }
                  onMouseDown={() =>
                    setIsVisible((isVisible) => ({
                      ...isVisible,
                      password_check: !isVisible.password_check,
                    }))
                  }
                >
                  {isVisible?.password_check ? (
                    <Visibility style={{ width: '18px' }} />
                  ) : (
                    <VisibilityOff style={{ width: '18px' }} />
                  )}
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
          <ColorButton
            sx={{ fontSize: '16px', fontWeight: 'bold' }}
            color="white"
            bgColor="#015B30"
            hoverBgColor="#015B30"
            onClick={handleSignUp}
            variant="contained"
            width={'100%'}
            height={'56px'}
            text="회원가입"
          />
          <Button
            onClick={() => router.replace('/')}
            sx={{
              color: '#015B30',
              height: '56px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            variant="text"
          >
            다음에 하기
          </Button>
        </div>
      </div>
      <CustomModal
        isModalOpen={isModalOpen}
        isBackClick={gotoHome}
        image={'/image/main/signup-image.png'}
        onClick={gotoHome}
        btnText="네네 선생님"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      />
    </Container>
  );
};

export default SignUpPage;

const cssstyle = `
.MuiFormHelperText-root{
  margin-top:-20px;
}
`;

import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
// components
import { ColorButton, Container } from '../src/components/common';
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
      if (!result?.toString().includes('400')) {
        setToken();
        // 쿠키 설정 완료
        setCookie('isLoading', false);
        setIsModalOpen(true);
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } else {
      alert('입력 폼에 맞게 입력해주세요.');
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
    const { result } = await postApi.checkID({ username: inputData.id });
    if (result) {
      setIsFormatOkay({ ...isFormatOkay, id: true });
    } else {
      setIsFormatOkay({ ...isFormatOkay, id: false });
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
    <Container bgColor={'#F8F0E9'}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div style={{ marginBottom: '60px' }}>
          <Typography sx={{ fontSize: '28px' }} fontWeight="600">
            마춤뻡에서 살아남기
          </Typography>
          <Typography sx={{ fontSize: '28px' }} fontWeight="600">
            입학
          </Typography>
        </div>
        <div style={{ width: '100%' }}>
          <TextField
            error={isFormatOkay.id || isFormatOkay.id === null ? false : true}
            helperText={
              isFormatOkay.id || isFormatOkay.id === null
                ? ''
                : '*중복된 아이디입니다.'
            }
            sx={{ width: '100%' }}
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
            InputProps={{
              style: { fontSize: 14, paddingBottom: '15px' },
            }}
          />
          <ColorButton
            color="white"
            bgColor="#015B30"
            hoverBgColor="#015B30"
            onClick={handleCheckID}
            variant="contained"
            width={'80px'}
            sx={{ position: 'absolute', fontSize: 12, right: 24 }}
            height={'30px'}
            text="중복 확인"
          />
        </div>
        <TextField
          id="password"
          sx={{ marginTop: '24px' }}
          placeholder="비밀번호 6자리 이상"
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
          placeholder="비밀번호 재입력"
          type={isVisible.password_check ? 'text' : 'password'}
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
            sx={{ color: '#E5E5E5', height: '56px', fontWeight: 'bold' }}
            variant="text"
          >
            다음에 하기
          </Button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={gotoHome}
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
            onClick={gotoHome}
            color={'white'}
            bgColor="#015B30"
            hoverBgColor="#015B30"
            sx={{
              height: '40px',
              width: '90%',
            }}
            variant="contained"
            width={'100%'}
            height={'56px'}
            text="확인"
          />
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

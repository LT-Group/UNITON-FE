import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Navigation from '../src/components/common/Navigation';
import { Container, CustomModal, ColorButton } from '../src/components/common';
import styled from '@emotion/styled';
import { getCookie } from '../token/TokenManager';
import Link from 'next/link';
import { getApi } from '../apis';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../stores/userInfo';

const StyledTypo = styled.div`
  margin-bottom: 16px;
`;

const Home = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLogin(getCookie('isLogin'));

      const userName = localStorage.getItem('userName');

      setUserInfo((userInfo) => ({ ...userInfo, userName }));

      const { user_id } = await getApi.getUserID(userName);
      const { count_paperuser } = await getApi.getTestCount(user_id);
      const { paper_count } = await getApi.getAllTestCount();

      setUserInfo((userInfo) => ({
        ...userInfo,
        count: count_paperuser + 1,
        entire_count: paper_count,
      }));

      localStorage.setItem('userID', user_id);
    };

    getData();
  }, []);

  const handleGoTest = () => {
    setIsModalOpen(false);
    router.push(`/write/${userInfo.count}`);
  };

  return (
    <Container bgColor={'#F8F0E9'}>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#F8F0E9',
          width: '100%',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {isLogin ? (
          <Typography sx={{ fontSize: '28px', lineHeight: '33.6px' }}>
            <span style={{ fontWeight: 'bold', color: '#015B30' }}>
              {userInfo.userName}
            </span>{' '}
            학생
            <br />
            <b>
              {userInfo.count}회 받아쓰기 시험을
              <br />
              시작해볼까요?
            </b>
          </Typography>
        ) : (
          <Typography sx={{ fontSize: '28px' }}>
            이 상태라면
            <br />
            <b>
              세종대왕님이
              <br />
              하늘에서 노하셔
            </b>
          </Typography>
        )}
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '16px', marginTop: '15px', marginBottom: '25px' }}
        >
          지금까지{' '}
          <span style={{ fontWeight: 'bold', color: '#C02C3D' }}>
            {userInfo.entire_count}
          </span>
          개의 시험이 풀렸어요.
        </Typography>
      </div>
      <div style={{ width: '100%', maxWidth: '320px' }}>
        <img
          src={
            isLogin
              ? '/image/main/onboarding-1.png'
              : '/image/main/onboarding-2.png'
          }
          alt={isLogin ? '철수와 영희 이미지' : '시험지 이미지'}
          style={{
            width: '100%',
            boxShadow: '0 0 0.2rem 0.2rem rgba(0,0,0,0.05)',
          }}
        />
        <div
          style={{
            width: 'calc(100% - 48px)',
            position: 'absolute',
            marginTop: '-100px',
            padding: '0 25px',
            maxWidth: '320px',
          }}
        >
          {isLogin ? (
            <ColorButton
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
              color="white"
              bgColor="#015B30"
              hoverBgColor="#037A41"
              onClick={() => setIsModalOpen(true)}
              variant="contained"
              width={'100%'}
              height={'56px'}
              text="시험보기"
            />
          ) : (
            <Link href="/login" passHref>
              <ColorButton
                sx={{ fontSize: '16px', fontWeight: 'bold' }}
                color="white"
                bgColor="#015B30"
                hoverBgColor="#037A41"
                onClick={() => {}}
                variant="contained"
                width={'100%'}
                height={'56px'}
                text="시작하기"
              />
            </Link>
          )}
        </div>
      </div>
      <Navigation />
      <CustomModal
        isModalOpen={isModalOpen}
        onClick={handleGoTest}
        isBackClick={() => setIsModalOpen(false)}
        text="시험 볼 준비 됐나요?"
        image={'/image/main/start-game.png'}
        btnText="네네 선생님"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      />
    </Container>
  );
};
export default Home;

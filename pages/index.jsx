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
  const kakaoID = '7867d65d97b436959a20d12a5bb1beae';

  useEffect(() => {
    const getData = async () => {
      setIsLogin(getCookie('isLogin'));

      const userName = localStorage.getItem('userName');

      setUserInfo((userInfo) => ({ ...userInfo, userName }));

      const { user_id } = await getApi.getUserID(userName);
      const { count_paperuser } =
        user_id !== 'None user found'
          ? await getApi.getTestCount(user_id)
          : { count_paperuser: 0 };

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

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoID);
      }
    }
  }, []);

  const kakaoSend = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoID);
      }
      window?.Kakao?.Link?.sendScrap({
        requestUrl: 'https://grammer-survive.netlify.app/',
      });
    }
  };

  return (
    <Container bgColor={'#F8F0E9'}>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#F8F0E9',
          width: '100%',
          flexDirection: 'column',
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          src={
            isLogin
              ? '/image/main/onboarding-1.png'
              : '/image/main/onboarding-2.png'
          }
          alt={isLogin ? '철수와 영희 이미지' : '시험지 이미지'}
        />
        <div
          style={{
            width: `calc(100% - 4.8rem)`,
            maxWidth: '380px',
            marginBottom: '3rem',
            position: 'absolute',
            padding: '0 2.5rem',
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
            <ColorButton
              onClick={() => router.push('/login')}
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
              color="white"
              bgColor="#015B30"
              hoverBgColor="#037A41"
              variant="contained"
              width={'100%'}
              height={'56px'}
              text="시작하기"
            />
          )}
        </div>
      </div>
      <ShareBtn onClick={kakaoSend}>마춤뻡에서 살아남기 공유하기</ShareBtn>
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

const Image = styled.img`
  box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.05);
  @media screen and (min-width: 380px) {
    width: calc(380px - 4.8rem);
    height: calc(490.2px - 6.192rem);
  }
  @media screen and (max-width: 380px) {
    width: calc(100vw - 4.8rem);
    height: calc(129vw - 6.192rem);
  }
`;

const ShareBtn = styled.div`
  width: 18.2rem;
  height: 3rem;
  background-color: #c02c3d;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
  margin-bottom: 12.2rem;
`;

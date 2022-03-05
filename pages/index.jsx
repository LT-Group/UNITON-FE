import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Navigation from '../src/components/common/Navigation';
import { Container } from '../src/components/common';
import styled from '@emotion/styled';
import { getCookie, setCookie } from '../token/TokenManager';
import Link from 'next/link';
import common from '../src/styles/common';

const StyledTypo = styled.div`
  margin-bottom: 16px;
`;

const Home = () => {
  const [count, setCount] = useState(350);
  const isLogin = getCookie('isLogin');
  return (
    <Container>
      <div style={{ width: '100%', alignItems: 'flex-start' }}>
        {isLogin ? (
          <StyledTypo>
            <Typography variant="h3" align="left">
              마춤뻡파괴자 학생
              <br />
              <b>
                1회 받아쓰기 시험을
                <br />
                시작해볼까요?
              </b>
            </Typography>
          </StyledTypo>
        ) : (
          <StyledTypo>
            <Typography variant="h3" align="left">
              이 상태라면
              <br />
              <b>
                세종대왕님이
                <br />
                하늘에서 울고계셔
              </b>
            </Typography>
          </StyledTypo>
        )}
        <StyledTypo>
          <Typography variant="h5" align="left">
            지금까지 <b>{count}개</b>의 시험이 풀렸어요.
          </Typography>
        </StyledTypo>
        <StyledTypo></StyledTypo>
        <Box component="div" sx={{ position: 'relative' }}>
          <Image
            src={isLogin ? '/image/main.png' : '/image/main_test.png'}
            alt={isLogin ? '철수와 영희 이미지' : '시험지 이미지'}
            width={320}
            height={424}
          />
          {isLogin ? (
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  backgroundColor: common.colors.point,
                  transform: 'translate(10px, 320px)',
                  width: '264px',
                  height: '40px',
                }}
              >
                <Typography variant="h5">시험보기</Typography>
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  backgroundColor: common.colors.point,
                  transform: 'translate(20px, 320px)',
                  width: '264px',
                  height: '40px',
                }}
              >
                <Typography variant="h5">시작하기</Typography>
              </Button>
            </Link>
          )}
        </Box>
        <Navigation />
      </div>
    </Container>
  );
};
export default Home;

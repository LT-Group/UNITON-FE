import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Navigation from '../src/components/common/Navigation';
import { Container } from '../src/components/common';
import styled from '@emotion/styled';
import { setCookie } from '../token/TokenManager';
import Link from 'next/link';

const StyledTypo = styled.div`
  margin-bottom: 16px;
`;

const MainButton = styled(Button)({
  variant: 'contained',
  color: 'success',
  sx: {
    display: 'inline',
    position: 'absolute',
    'z-index': 1,
    cursor: 'pointer',
    transform: 'translate(28px, 320px)',
    width: 264,
    height: 40,
  },
});
const Home = () => {
  const [count, setCount] = useState(350);
  return (
    <Container>
      <div style={{ width: '100%', alignItems: 'flex-start' }}>
        <Typography variant="h3" align="left">
          이 상태라면
          <br />
          <b>
            세종대왕님이
            <br />
            하늘에서 울고계셔
          </b>
        </Typography>
      </div>
      {setCookie.isLogin ? (
        <StyledTypo>
          <Typography variant="h5" align="left">
            이 상태라면
            <br />
            <b>
              세종대왕님이
              <br />
              하늘에서 울고계셔
            </b>
          </Typography>
        </StyledTypo>
      ) : (
        <StyledTypo>
          <Typography variant="h5" align="left">
            마춤뻡파괴자 학생
            <br />
            <b>
              1회 받아쓰기 시험을
              <br />
              시작해볼까요?
            </b>
          </Typography>
        </StyledTypo>
      )}
      <StyledTypo>
        <Typography variant="subtitle2" align="left">
          지금까지 <b>{count}개</b>의 시험이 풀렸어요.
        </Typography>
      </StyledTypo>
      <StyledTypo></StyledTypo>
      <Box
        component="div"
        sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
      >
        {setCookie.isLogin ? (
          <Link href="/login" passHref>
            <MainButton>
              <Typography variant="button">시험보기</Typography>
            </MainButton>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <MainButton>
              <Typography variant="button">시작하기</Typography>
            </MainButton>
          </Link>
        )}
        <Image
          src={setCookie.isLogin ? 'image/main_text.png' : '/image/main.png'}
          alt={setCookie.isLogin ? '철수와 영희 이미지' : '시험지 이미지'}
          width={320}
          height={424}
          passHref
        />
      </Box>
      <Navigation />
    </Container>
  );
};
export default Home;

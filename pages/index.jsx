import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Navigation from '../src/components/common/Navigation';

const Home = () => {
  const [count, setCount] = useState(350);
  return (
    <>
      <Typography variant="h3" align="left">
        이 상태라면
        <br />
        <b>
          세종대왕님이
          <br />
          하늘에서 울고계셔
        </b>
      </Typography>
      <Typography variant="subtitle2" align="left">
        지금까지 <b>{count}개</b>의 시험이 풀렸어요.
      </Typography>
      <Box component="div" sx={{ display: 'flex', position: 'relative' }}>
        <Button
          variant="contained"
          color="success"
          sx={{
            display: 'inline',
            position: 'absolute',
            'z-index': 1,
            cursor: 'pointer',
            transform: 'translate(28px, 320px)',
            width: 264,
            height: 40,
          }}
        >
          <Typography variant="button">시작하기</Typography>
        </Button>
        <Image
          src="/image/main.png"
          alt="철수와 영희 이미지"
          width={320}
          height={424}
        />
      </Box>
      <Navigation />
    </>
  );
};
export default Home;

import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';

const WriteTitle = () => {
  const router = useRouter();

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return `${year}년 ${month}월 ${day}일`;
  };

  if (!router.query.id) return null;

  return (
    <>
      <Typography variant="h5" mb="17px">
        제 {router.query.id}회 받아쓰기
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography ml={2} component="span" varaint="body1">
          {getDate()}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography component="span" ml={2} varaint="body1">
          이름
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default WriteTitle;

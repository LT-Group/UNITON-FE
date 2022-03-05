import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Divider, Typography } from '@mui/material';
import { getDate } from '../../utils';

const WriteTitle = ({ isButton, onToggle, isPlay }) => {
  const router = useRouter();

  if (!router.query.id) return null;

  return (
    <>
      <Box
        sx={{
          mb: '17px',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h3">
          제 {router.query.id}회 받아쓰기
        </Typography>
        {isButton && (
          <Button
            onClick={onToggle}
            sx={{
              width: 88,
              height: 30,
              ml: '40px',
              color: 'white',
              borderRadius: 20,
              backgroundColor: '#C02C3D',
              '&:hover': {
                backgroundColor: '#C02C3D',
              },
            }}
          >
            {isPlay ? '일시정지' : '시험시작'}
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography ml={2} component="span" varaint="body1">
          {getDate()}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
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

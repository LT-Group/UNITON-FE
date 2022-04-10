import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Divider, Typography } from '@mui/material';
import { getDate } from '../../utils';

const WriteTitle = ({ isButton, isTotalTest, soundClick }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!localStorage) return;

    const userInfo = localStorage.getItem('userName');
    setUserName(userInfo);
  }, []);

  if (!router.query.id) return null;

  return (
    <>
      <Box
        sx={{
          mb: '17px',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: `${isButton ? 'space-between' : 'flex-start'}`,
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          sx={{
            fontFamily: 'Pretendard',
            fontWeight: 'bold',
            color: '#443C22',
          }}
        >
          제 {router.query.id}회 받아쓰기
        </Typography>
        {isButton && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Image
              id="total"
              onClick={soundClick}
              src={isTotalTest ? '/icon/totalStop.svg' : '/icon/totalPlay.svg'}
              alt="totalSound"
              width={88}
              height={32}
            />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography
          ml={2}
          component="span"
          varaint="body1"
          sx={{
            fontSize: '22px',
            fontFamily: 'Middleschool_student',
            color: '#443C22',
          }}
        >
          {getDate()}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography
          component="span"
          ml={2}
          varaint="body1"
          sx={{
            fontSize: '22px',
            fontFamily: 'Middleschool_student',
            color: '#443C22',
          }}
        >
          {userName}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default WriteTitle;

import React, { useState, useEffect } from 'react';
import TotalScore from '../common/TotalScore';
import { useRouter } from 'next/router';
import { Divider, Typography, Box, List, ListItem } from '@mui/material';
import { getDate } from '../../utils';
import Image from 'next/image';
import axios from 'axios';

const MyTestPaper = () => {
  const router = useRouter();
  const [testData, setTestData] = useState({
    answer_user: [],
    created_at: '',
    is_correct_list: [],
    score: 0,
    username: '',
    answer: [],
  });

  useEffect(() => {
    if (!localStorage || !router) return;

    const userId = localStorage.getItem('userID');

    const fetchData = async () => {
      try {
        const { data } = await axios({
          baseURL: API_DOMAIN,
          url: `/papers/get_paper_detail/${userId}/${router.query.id}/`,
          method: 'get',
        });

        setTestData(data);
      } catch (e) {
        // console.log(e);
      }
    };

    fetchData();
  }, [router?.query?.id]);

  if (!router) return null;

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            mb: '17px',
            fontFamily: 'Pretendard',
            fontWeight: 'bold',
            color: '#443C22',
          }}
        >
          제 {router.query.id}회 받아쓰기
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography
          sx={{
            ml: 2,
            fontSize: '22px',
            fontFamily: 'Middleschool_student',
            color: '#443C22',
          }}
          component="span"
          varaint="body1"
        >
          {getDate(testData.created_at)}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography
          component="span"
          sx={{
            ml: 2,
            fontSize: '22px',
            fontFamily: 'Middleschool_student',
            color: '#443C22',
          }}
          varaint="body1"
        >
          {testData.username}
        </Typography>
      </Box>
      <Divider />
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {testData.is_correct_list?.length &&
          testData.is_correct_list.map((isCorrect, i) => {
            return (
              <React.Fragment key={i}>
                <ListItem
                  disablePadding
                  sx={{
                    height: 63,
                  }}
                >
                  <Box sx={{ width: 44, textAlign: 'center' }}>
                    <Image
                      src={`/image/paper/${i + 1}.png`}
                      alt={i + 1}
                      width={9}
                      height={23}
                    />
                  </Box>
                  <Divider orientation="vertical" />
                  <Box
                    sx={{
                      maxWidth: 282,
                      marginLeft: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{
                        fontSize: '22px',
                        fontFamily: 'Middleschool_student',
                        color: '#443C22',
                      }}
                    >
                      {testData.answer_user[i]}
                    </Typography>
                    {!isCorrect && (
                      <Typography
                        component="div"
                        variant="body2"
                        color="red"
                        sx={{
                          fontSize: '22px',
                          fontFamily: 'Middleschool_student',
                          color: '#C02C3D',
                        }}
                      >
                        {testData.answer[i]}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        <TotalScore score={testData.score} />
      </List>
    </>
  );
};

export default MyTestPaper;

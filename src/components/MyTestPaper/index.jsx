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
    if (!router) return;

    const fetchData = async () => {
      try {
        //userId와 paperId
        const { data } = await axios({
          baseURL: API_DOMAIN,
          url: `/papers/get_paper_detail/6/1/`,
          method: 'get',
        });
        setTestData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [router.query.id]);

  if (!router) return null;

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Typography variant="h3" mb="17px">
          제 {router.query.id}회 받아쓰기
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography ml={2} component="span" varaint="body1">
          {getDate(testData.created_at)}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography component="span" ml={2} varaint="body1">
          {testData.username}
        </Typography>
      </Box>
      <Divider />
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {testData.is_correct_list.length &&
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
                    <Typography component="div" variant="body2">
                      {testData.answer_user[i]}
                    </Typography>
                    {!isCorrect && (
                      <Typography component="div" variant="body2" color="red">
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Divider,
  Typography,
  Box,
  List,
  ListItem,
  Avatar,
} from '@mui/material';
import { getDate, getStamp } from '../../utils';
import Image from 'next/image';

const MyTestPaper = () => {
  const router = useRouter();
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    if (!router) return;
    if (!testData) return;

    const fetchData = async () => {
      try {
        const { data } = await axios({
          baseURL: API_DOMAIN,
          url: `papers/get_paper_detail/2/6/`,
          method: 'get',
        });

        setTestData(data);
      } catch (e) {}
    };

    fetchData();
  }, []);

  if (!router || !testData) return null;

  return (
    <>
      <Typography variant="h5" mb="17px">
        제 {router.query.id}회 받아쓰기
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography ml={2} component="span" varaint="body1">
          {getDate(testData?.date)}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography component="span" ml={2} varaint="body1">
          {testData?.username}
        </Typography>
      </Box>
      <Divider />
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {testData?.is_correct_list &&
          testData?.is_correct_list.map((isCorrect, i) => {
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
                      {testData?.answer_user[i]}
                    </Typography>
                    {!isCorrect && (
                      <Typography component="div" variant="body2" color="red">
                        {testData?.answer[i]}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        <ListItem
          disablePadding
          sx={{
            pt: '18px',
            pl: '18px',
            height: 116,
            alignItems: 'flex-start',
          }}
        >
          <Image
            src="/image/paper/totalScore.png"
            alt="totalScore"
            width={31}
            height={18}
          />
          <Box ml={5}>
            <Typography variant="h2" color="red">
              {testData?.problems[0]}
            </Typography>
            <Image
              width={74}
              height={26}
              src="/image/paper/scoreUnderline.png"
              alt="scoreUnderline"
            />
          </Box>
          <Avatar
            src={`/image/paper/${getStamp(score)}.png`}
            alt="stamp"
            sx={{
              ml: 7,
              width: 96,
              height: 96,
            }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default MyTestPaper;

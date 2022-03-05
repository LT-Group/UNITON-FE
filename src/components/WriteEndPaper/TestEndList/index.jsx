import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { ProblomsState } from '../../../store/atoms';

const TestEndList = () => {
  const problems = useRecoilValue(ProblomsState);

  const getStamp = (score) => {
    if (score >= 80) {
      return 'Good';
    } else if (score >= 60) {
      return 'Soso';
    } else {
      return 'Bad';
    }
  };

  return (
    <>
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {problems.map((problem, i) => {
          if (i === 0) return;

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
                    src={`/image/paper/${i}.png`}
                    alt={i}
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
                    {problem.input}
                  </Typography>
                  {problems.answer && (
                    <Typography component="div" variant="body2" color="red">
                      {problems.answer}
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
              {problems[0]}
            </Typography>
            <Image
              width={74}
              height={26}
              src="/image/paper/scoreUnderline.png"
              alt="scoreUnderline"
            />
          </Box>
          {problems[0] && (
            <Avatar
              src={`/image/paper/${getStamp(Number(problems[0]))}.png`}
              alt="stamp"
              sx={{
                ml: 7,
                width: 96,
                height: 96,
              }}
            />
          )}
        </ListItem>
      </List>
    </>
  );
};

const problemNums = [1, 2, 3, 4, 5];

export default TestEndList;

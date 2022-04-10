import React from 'react';
import Image from 'next/image';
import { Box, Divider, Input, List, ListItem, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { problemsState } from '../../../stores/problems';

const TestList = ({ isPlayAudio, handleChange, soundClick }) => {
  const problems = useRecoilValue(problemsState);
  const lists = Object.entries(problems);

  return (
    <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
      {lists.map((problem, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem
              disablePadding
              sx={{
                height: 63,
              }}
            >
              <Box sx={{ width: 44, textAlign: 'center' }}>
                <Typography
                  component="span"
                  sx={{
                    cursor: 'pointer',
                    fontFamily: `'Nanum Myeongjo', serif`,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {i + 1}
                </Typography>
              </Box>
              <Divider orientation="vertical" />
              <Input
                autoComplete="off"
                name={`problem${i}`}
                sx={{
                  width: `calc(100% - 44px)`,
                  pl: 2,
                  pr: 2,
                  color: '#443C22',
                }}
                placeholder="답안 작성"
                disableUnderline
                inputProps={{
                  style: {
                    display: 'block',
                    fontSize: '22px',
                    fontFamily: 'Middleschool_student',
                  },
                }}
                onChange={handleChange}
              />
              <Box sx={{ mr: 2, cursor: 'pointer' }}>
                <Image
                  id={`problem${i + 1}`}
                  onClick={soundClick}
                  src={
                    isPlayAudio === `problem${i + 1}`
                      ? '/icon/problemStop.svg'
                      : '/icon/problemPlay.svg'
                  }
                  alt="play"
                  width={24}
                  height={24}
                />
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
      <ListItem disablePadding sx={{ height: 116, alignItems: 'flex-start' }}>
        <Box pt="18px" pl="18px">
          <Image
            src="/image/paper/totalScore.png"
            alt="totalScore"
            width={31}
            height={18}
          />
        </Box>
      </ListItem>
    </List>
  );
};

export default TestList;

import React from 'react';
import Image from 'next/image';
import { Box, Divider, Input, List, ListItem, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { problemsState } from '../../../stores/problems';

<<<<<<< HEAD:src/components/WritePaper/TestList.jsx
const TestList = ({ handleChange }) => {
  const problems = useRecoilValue(problemsState);
  const lists = Object.entries(problems);
=======
const TestList = () => {
  const [problems, setProblems] = useRecoilState(ProblemsState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameIndex = Number(name.split('input')[1]);
    const nextState = problems.map((prevValue, i) => {
      if (i === 0) return prevValue;
      return nameIndex === i ? { ...problems[i], input: value } : prevValue;
    });

    setProblems(nextState);
  };
>>>>>>> cd1d250 (Fix: 오류수정):src/components/WritePaper/TestList/index.jsx

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

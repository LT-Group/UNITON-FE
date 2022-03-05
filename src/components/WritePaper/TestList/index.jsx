import React from 'react';
import Image from 'next/image';
import { Box, Divider, Input, List, ListItem } from '@mui/material';
import { ProblemsState } from '../../../store/atoms';
import { useRecoilState } from 'recoil';

const TestList = () => {
  const [problems, setProblems] = useRecoilState(ProblemsState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameIndex = Number(name.split('input')[1]);
    const nextState = problems.map((prevValue, i) =>
      nameIndex === i ? { ...problems[i], input: value } : prevValue,
    );
    setProblems(nextState);
  };

  return (
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
              <Input
                name={`input${i}`}
                sx={{ maxWidth: 282, marginLeft: 2 }}
                placeholder={answerWriter}
                disableUnderline
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

const answerWriter = '답안 작성';

export default TestList;
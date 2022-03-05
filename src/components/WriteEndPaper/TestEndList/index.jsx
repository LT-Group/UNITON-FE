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
import { ProblemsState } from '../../../store/atoms';
import TotalScore from '../../common/TotalScore';

const TestEndList = () => {
  const problems = useRecoilValue(ProblemsState);

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
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{
                      fontSize: '22px',
                      fontFamily: 'Middleschool_student',
                      color: '#443C22',
                    }}
                  >
                    {problem.input}
                  </Typography>
                  {problem.answer && (
                    <Typography
                      component="div"
                      variant="body2"
                      color="#C02C3D"
                      sx={{
                        fontSize: '22px',
                        fontFamily: 'Middleschool_student',
                      }}
                    >
                      {problem.answer}
                    </Typography>
                  )}
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
        <TotalScore score={problems[0]} />
      </List>
    </>
  );
};

export default TestEndList;

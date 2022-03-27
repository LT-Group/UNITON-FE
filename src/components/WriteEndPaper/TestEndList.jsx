import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import TotalScore from '../common/TotalScore';

const TestEndList = ({ results }) => {
  const { answer, answer_user, score, is_correct_list } = results;

  return (
    <>
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {answer_user.map((answerUser, i) => {
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
                    {answerUser}
                  </Typography>
                  {!is_correct_list[i] && (
                    <Typography
                      component="div"
                      variant="body2"
                      color="#C02C3D"
                      sx={{
                        fontSize: '22px',
                        fontFamily: 'Middleschool_student',
                      }}
                    >
                      {answer[i]}
                    </Typography>
                  )}
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
        <TotalScore score={score} />
      </List>
    </>
  );
};

export default TestEndList;

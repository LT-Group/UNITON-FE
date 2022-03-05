import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography, Box, List, ListItem } from '@mui/material';
import { getDate, getStamp } from '../../utils';

const MyTestPaper = ({
  times,
  username,
  date,
  score,
  is_correct_list,
  answer_user,
  answer,
}) => {
  return (
    <>
      <Typography variant="h5" mb="17px">
        제 {times}회 받아쓰기
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/date.png" alt="날짜" width={31} height={18} />
        <Typography ml={2} component="span" varaint="body1">
          {getDate(date)}
        </Typography>
      </Box>
      <Divider mb="4px" />
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/image/paper/name.png" alt="이름" width={31} height={18} />
        <Typography component="span" ml={2} varaint="body1">
          {username}
        </Typography>
      </Box>
      <Divider />
      <List disablePadding sx={{ width: '100%', border: '1px solid' }}>
        {is_correct_list.map((isCorrect, i) => {
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
                    {answer_user[i]}
                  </Typography>
                  {!isCorrect && (
                    <Typography component="div" variant="body2" color="red">
                      {answer[i]}
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

MyTestPaper.propTypes = {
  username: PropTypes.string,
  date: PropTypes.string,
  score: PropTypes.number,
  is_correct_list: PropTypes.arrayOf(PropTypes.bool),
  answer_user: PropTypes.arrayOf(PropTypes.string),
  answer: PropTypes.arrayOf(PropTypes.string),
};

export default MyTestPaper;

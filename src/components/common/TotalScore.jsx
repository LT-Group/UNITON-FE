import { Avatar, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import { getStamp } from '../../utils';

const TotalScore = ({ score }) => {
  return (
    <ListItem
      disablePadding
      sx={{
        pl: '18px',
        height: 116,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box mt="18px">
          <Image
            src="/image/paper/totalScore.png"
            alt="totalScore"
            width={31}
            height={18}
          />
        </Box>
        <Box ml={5} mt={1} sx={{ position: 'relative', width: 64, height: 92 }}>
          <Typography
            variant="h2"
            color="#C02C3D"
            sx={{
              position: 'absolute',
              fontSize: 80,
              top: '-30px',
              left: '10%',
              fontFamily: 'Middleschool_student',
            }}
          >
            {score}
          </Typography>
          <Box
            sx={{
              width: 74,
              height: 26,
              position: 'absolute',
              top: '55%',
              left: 0,
            }}
          >
            <Image
              width={74}
              height={26}
              src="/image/paper/scoreUnderline.png"
              alt="scoreUnderline"
            />
          </Box>
        </Box>
      </Box>
      {score >= 0 && (
        <Avatar
          src={`/image/paper/${getStamp(score)}.png`}
          alt="stamp"
          sx={{
            mt: 1,
            mr: 5,
            width: 96,
            height: 96,
          }}
        />
      )}
    </ListItem>
  );
};

TotalScore.propTypes = {
  score: PropTypes.number,
};

export default TotalScore;

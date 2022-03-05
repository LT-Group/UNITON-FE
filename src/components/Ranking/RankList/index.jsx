import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, Typography } from '@mui/material';

const RankList = ({ rankList }) => {
  return (
    <List
      disablePadding
      sx={{ width: '100%', maxWidth: 360, border: '1px solid' }}
    >
      {rankList.map((rankInfo, i) => {
        const { problemRank, problem, successRate } = rankInfo;
        return (
          <ListItem
            key={i}
            alignItems="center"
            disablePadding
            sx={{
              justifyContent: 'space-between',
              height: 68,
              borderBottom: `${
                rankList.length - 1 === i ? 'none' : '1px solid'
              }`,
            }}
          >
            <Box ml={1} sx={{ display: 'flex' }}>
              <Typography component="div" variant="body2">
                {problemRank}등
              </Typography>
              <Typography ml={3} component="div" variant="body1">
                {problem}
              </Typography>
            </Box>
            <Typography mr={1} component="div" variant="body2">
              {successRate}%
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

RankList.propTypes = {
  rankList: PropTypes.arrayOf(
    PropTypes.shape({
      problemRank: PropTypes.number,
      problem: PropTypes.string,
      successRate: PropTypes.number,
    }),
  ),
};

export default RankList;

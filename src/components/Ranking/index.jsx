import React from 'react';
import PropTypes from 'prop-types';
import RankList from './RankList';
import { Typography } from '@mui/material';

const Ranking = ({ rankList }) => {
  return (
    <>
      <Typography mb="28px" component="h2" variant="h5">
        어려운 맞춤법 순위
      </Typography>
      <RankList rankList={rankList} />
    </>
  );
};

Ranking.propTypes = {
  //객체를 가진 배열을 proptype로 받음
  rankList: PropTypes.arrayOf(
    PropTypes.shape({
      problemRank: PropTypes.number,
      problem: PropTypes.string,
      successRate: PropTypes.number,
    }),
  ),
};
//rankList 예제

export default Ranking;

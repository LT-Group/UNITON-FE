import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import theme from '../../styles';
import { MypageIcon, RankingIcon, SolveIcon } from './Icon';

const Navigation = () => {
  const [value, setValue] = useState('solve');
  return (
    <BottomNavigation
      showLabels
      value={value}
      color="success"
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="문제풀기"
        value="solve"
        icon={<SolveIcon />}
      />
      <BottomNavigationAction
        label="많이 틀린 문제"
        value="ranking"
        icon={<RankingIcon />}
      />
      <BottomNavigationAction
        label="생활기록부"
        value="mypage"
        icon={<MypageIcon />}
      />
    </BottomNavigation>
  );
};

export default Navigation;

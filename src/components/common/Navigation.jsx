import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { MypageIcon, RankingIcon, SolveIcon } from './Icon';
import { useRouter } from 'next/router';
const Navigation = () => {
  const router = useRouter();
  const [value, setValue] = useState('solve');
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: '0 0 0.15rem 0.15rem rgba(0,0,0,0.05)',
      }}
      value={value}
      color="success"
      onChange={(event, newValue) => {
        setValue(newValue);
        router.replace(`/${newValue}`);
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

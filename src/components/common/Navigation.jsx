import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { MypageIcon, RankingIcon, SolveIcon } from './Icon';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
const Navigation = () => {
  const router = useRouter();
  const [value, setValue] = useState('solve');
  return (
    <BottomNavigationList
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: '0 0 0.15rem 0.15rem rgba(0,0,0,0.05)',
      }}
      value={value}
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
        value="myPage"
        icon={<MypageIcon sx={{ width: '20 imporatant!' }} />}
      />
    </BottomNavigationList>
  );
};
export default Navigation;

const BottomNavigationList = styled(BottomNavigation)`
  font-size: 14px !important;
  height: 83px;
  background-color: #f1e8df;
  .Mui-selected {
    color: #015b30 !important;
  }
  .MuiSvgIcon-root {
    width: 30px !important;
    height: 30px !important;
    margin-bottom: 6px;
  }
  .MuiBottomNavigationAction-label {
    font-size: 12px !important;
  }
`;

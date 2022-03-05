import React from 'react';
import WriteTitle from '../common/WriteTitle';
import TestEndList from './TestEndList';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import { useRecoilState } from 'recoil';
import { problemsInitialState, ProblemsState } from '../../store/atoms';

const WriteEndPaper = () => {
  const router = useRouter();
  const [problems, setProblems] = useRecoilState(ProblemsState);

  const goMyPage = () => {
    setProblems(problemsInitialState);

    router.push(`/mypage`);
  };

  const goTesting = () => {
    setProblems(problemsInitialState);

    router.push(`/`);
  };

  return (
    <>
      <WriteTitle />
      <TestEndList />
      <Grid container spacing={2} mt={6}>
        <Grid item xs={6}>
          <Button
            component="a"
            fullWidth
            variant="contained"
            sx={{
              height: 56,
              backgroundColor: '#015B30',
              '&:hover': {
                backgroundColor: '#015B30',
              },
            }}
            onClick={goMyPage}
          >
            생활기록부 보기
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 56,
              backgroundColor: '#015B30',
              '&:hover': {
                backgroundColor: '#015B30',
              },
            }}
            onClick={goTesting}
          >
            다른 시험 보기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WriteEndPaper;

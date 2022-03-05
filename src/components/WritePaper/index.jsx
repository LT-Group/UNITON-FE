import React from 'react';
import WriteTitle from '../common/WriteTitle';
import TestList from './TestList';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { problemsInitialState, ProblemsState } from '../../store/atoms';
import { Box, Button } from '@mui/material';
import axios from 'axios';

const WritePaper = () => {
  const router = useRouter();
  const [problems, setProblems] = useRecoilState(ProblemsState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [score, ...inputs] = problems;
    const answer = [...inputs].map((input) => input.input);
    const requestData = {
      user: 1,
      paper: 3,
      answer,
    };
    console.log(requestData);

    try {
      const { data } = await axios({
        baseURL: API_DOMAIN,
        url: `papers/post_paper/`,
        method: 'post',
        data: requestData,
      });
      console.log(data);
    } catch (e) {
      console.log('error', e);
    }
    // 이동 잘되는 지 확인하기
    // router.push(`/write/${router.query.id}/end`);
  };

  const moveMainPage = () => {
    setProblems(problemsInitialState);
    router.replace('/');
  };

  if (!router.query.id) return null;

  return (
    <>
      <WriteTitle />
      <TestList />
      <Box>
        <Button
          component="a"
          fullWidth
          variant="contained"
          sx={{ height: 56 }}
          onClick={handleSubmit}
        >
          다 풀었어요
        </Button>
        <Button fullWidth sx={{ height: 56 }} onClick={moveMainPage}>
          다음에 풀기
        </Button>
      </Box>
    </>
  );
};

export default WritePaper;

import React, { useEffect } from 'react';
import WriteTitle from '../common/WriteTitle';
import TestList from './TestList';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { problemsInitialState, ProblemsState } from '../../../stores/problems';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import next from 'next';
import { UserInfo } from '../../../stores/userInfo';

const WritePaper = ({ isButton, onToggle, isPlay, paperId }) => {
  const router = useRouter();
  const [problems, setProblems] = useRecoilState(ProblemsState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [score, ...inputs] = problems;
    const answer = [...inputs].map((input) => input.input);
    const userId = await localStorage.getItem('userID');

    const requestData = {
      user_id: userId,
      paper_id: paperId,
      answer,
    };

    try {
      onToggle();

      const { data } = await axios({
        baseURL: API_DOMAIN,
        url: `papers/post_paper/`,
        method: 'post',
        data: requestData,
      });

      const nextState = data.answer.map((resAnswer, i) => {
        if (data.is_correct[i]) {
          return { input: answer[i], answer: inputs[i + 1].answer };
        }
        return { input: answer[i], answer: resAnswer };
      });

      setProblems([data.score, ...nextState]);
      router.push(`/write/${router.query.id}/end`);
    } catch (e) {
      console.log('error', e);
    }
  };

  const moveMainPage = () => {
    setProblems(problemsInitialState);
    router.replace('/');
  };

  if (!router.query.id) return null;

  return (
    <>
      <WriteTitle isButton={isButton} onToggle={onToggle} isPlay={isPlay} />
      <TestList />
      <Box sx={{ width: '100%', mt: '31px' }}>
        <Button
          component="a"
          fullWidth
          variant="contained"
          sx={{
            fontSize: '16px',
            height: 56,
            backgroundColor: '#015B30',
            '&:hover': {
              backgroundColor: '#015B30',
            },
          }}
          onClick={handleSubmit}
        >
          다 풀었어요
        </Button>
        <Button
          fullWidth
          sx={{
            fontSize: '16px',
            height: 56,
            color: '#015B30',
            '&:hover': {
              color: '#015B30',
            },
          }}
          onClick={moveMainPage}
        >
          다음에 풀기
        </Button>
      </Box>
    </>
  );
};

export default WritePaper;

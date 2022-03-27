import React, { useState } from 'react';
import WriteTitle from '../common/WriteTitle';
import TestList from './TestList';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { problemsInitialState, problemsState } from '../../../stores/problems';
import { Box, Button } from '@mui/material';
import { userPaperId } from '../../../stores/paperId';
import { postApi } from '../../../apis';

const WritePaper = ({ isTotalTest, isButton, soundClick }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const paperId = useRecoilValue(userPaperId);
  const [problems, setProblems] = useRecoilState(problemsState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblems({ ...problems, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = localStorage.getItem('userID');
    const answer = Object.entries(problems).map((problem) => problem[1]);

    try {
      await postApi.submitAnswer({
        user_id: userId,
        paper_id: paperId,
        answer,
      });

      setProblems(problemsInitialState);
      setIsLoading(false);
      router.push(`/write/${router.query.id}/end`);
    } catch (e) {
      // console.log('error', e);
      setIsLoading(false);
    }
  };

  const moveMainPage = () => {
    setProblems(problemsInitialState);

    router.replace('/');
  };

  if (!router) return null;

  return (
    <>
      <WriteTitle
        isButton={isButton}
        isTotalTest={isTotalTest}
        soundClick={soundClick}
      />
      <TestList handleChange={handleChange} soundClick={soundClick} />
      <Box sx={{ width: '100%', mt: '31px' }}>
        <Button
          component="a"
          fullWidth
          variant="contained"
          disabled={isLoading}
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

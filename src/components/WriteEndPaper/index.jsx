import React, { useEffect, useState } from 'react';
import WriteTitle from '../common/WriteTitle';
import TestEndList from './TestEndList';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userPaperId } from '../../../stores/paperId';
import { getApi } from '../../../apis';

const WriteEndPaper = () => {
  const router = useRouter();
  const paperId = useRecoilValue(userPaperId);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const userId = localStorage.getItem('userID');

    try {
      const data = await getApi.getTestResult({ userId, paperId });
      setResults(data);
    } catch (e) {
      // console.log(e);
    }
  };

  if (!router) return null;

  return (
    <>
      <WriteTitle />
      {results && <TestEndList results={results} />}
      <Grid container spacing={2} mt={6}>
        <Grid item xs={6}>
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
            onClick={() => router.push(`/mypage`)}
          >
            생활기록부 보기
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
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
            onClick={() => router.push(`/`)}
          >
            다른 시험 보기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WriteEndPaper;

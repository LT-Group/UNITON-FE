import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import MyTestPaper from '../../src/components/MyTestPaper';
import { Button } from '@mui/material';

const MyTestPage = () => {
  const router = useRouter();
  return (
    <>
      <MyTestPaper />
      <Button
        fullWidth
        sx={{ mt: 6, height: 56 }}
        onClick={() => router.back()}
      >
        닫기
      </Button>
    </>
  );
};

export default MyTestPage;

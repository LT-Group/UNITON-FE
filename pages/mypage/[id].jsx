import React from 'react';
import { useRouter } from 'next/router';
import MyTestPaper from '../../src/components/MyTestPaper';
import { Button } from '@mui/material';
import Container from '../../src/components/common/Container';

const MyTestPage = () => {
  const router = useRouter();

  return (
    <Container bgColor={'#F8F0E9'}>
      <MyTestPaper />
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 6,
          height: 56,
          fontSize: '16px',
          backgroundColor: '#015B30',
          '&:hover': {
            backgroundColor: '#015B30',
          },
        }}
        onClick={() => router.back()}
      >
        닫기
      </Button>
    </Container>
  );
};

export default MyTestPage;

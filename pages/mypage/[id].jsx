import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyTestPaper from '../../src/components/MyTestPaper';
import { Button } from '@mui/material';

const MyTestPage = () => {
  const router = useRouter();
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    if (!router.query.id) return;

    const fetchData = async () => {
      try {
        const { data } = await axios({
          baseURL: API_DOMAIN,
          url: `papers/get_paper_detail/2/6/`,
          method: 'get',
          data: body,
        });

        setTestData(data);
      } catch (e) {}
    };

    fetchData();
  }, [router.query?.id]);

  if (!router.query.id) null;

  return (
    <>
      <MyTestPaper
        times={router.query.id}
        username={testData.username}
        date={testData.created_at}
        score={testData.score}
        is_correct_list={testData.is_correct_list}
        answer_user={testData.answer_user}
        answer={testData.answer}
      />
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

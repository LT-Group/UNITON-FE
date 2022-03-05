import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
// components
import { Container, Navigation } from '../src/components/common';
// mui
import { Typography } from '@mui/material';
// api
import { getApi } from '../apis';
const LoginPage = () => {
  const [datas, setDatas] = useState([]);

  useEffect(async () => {
    const result = await getApi.getRankingData();
    console.log(result);
    setDatas(result);
  }, []);
  return (
    <Container bgColor={'#F8F0E9'}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 'bold',
            fontFamily: 'Pretendard',
            color: '#443C22',
          }}
        >
          많이 틀린 문제 10
        </Typography>
        <div
          style={{
            display: 'flex',
            marginTop: '28px',
            flexDirection: 'column',
          }}
        >
          {datas.map((data, idx) => {
            return (
              <Box
                key={idx}
                isEven={idx % 2 == 0}
                isLast={datas.length - 1 === idx}
              >
                <div
                  style={{
                    fontSize: '16px',
                    height: '64px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    width: '44px',
                    borderRight: '1px solid #c4c4c4',
                  }}
                >
                  {data.rank}
                </div>
                <div
                  style={{
                    width: 'calc(100% - 44px)',
                    padding: '16px',
                    display: 'flex',
                    fontSize: '22px',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontFamily: 'Middleschool_student' }}>
                    {data.setence}
                  </div>
                  <div
                    style={{
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#C02C3D',
                    }}
                  >
                    {' '}
                    {data.percentage}
                  </div>
                </div>
              </Box>
            );
          })}
        </div>
      </div>
      <Navigation />
    </Container>
  );
};

const Box = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-top: ${(props) => (props.isEven ? '1px solid #c4c4c4' : 'none')};
  border-bottom: ${(props) =>
    props.isEven || props.isLast ? '1px solid #c4c4c4' : 'none'};
`;
const NumberBox = styled.div`
  font-size: 16px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 44px;
  border-right: 1px solid #c4c4c4;
`;

const ContentsBox = styled.div`
  width: calc(100% - 44px);
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;
const Sentence = styled.div`
  font-size: 22px;
  font-family: 'Middleschool_student';
`;
const Percentage = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #c02c3d;
`;
export default LoginPage;

import React from 'react';
import styled from '@emotion/styled';
// components
import { Container, Navigation } from '../src/components/common';
// mui
import { TextField, Button, Typography } from '@mui/material';

const LoginPage = () => {
  const datas = [
    { rank: 1, setence: '웬만하면', percentage: '56%' },
    { rank: 2, setence: '웬만하면', percentage: '56%' },
    { rank: 3, setence: '웬만하면', percentage: '56%' },
    { rank: 4, setence: '웬만하면', percentage: '56%' },
    { rank: 5, setence: '웬만하면', percentage: '56%' },
    { rank: 6, setence: '웬만하면', percentage: '56%' },
    { rank: 7, setence: '웬만하면', percentage: '56%' },
    { rank: 8, setence: '웬만하면', percentage: '56%' },
    { rank: 9, setence: '웬만하면', percentage: '56%' },
    { rank: 10, setence: '웬만하면', percentage: '56%' },
  ];
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
              <Box isEven={idx % 2 == 0} isLast={datas.length - 1 === idx}>
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

export default LoginPage;

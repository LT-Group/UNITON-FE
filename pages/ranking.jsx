import React from 'react';
import styled from '@emotion/styled';
// components
import { Container } from '../src/components/common';
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
    <Container>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
          어려운 맞춤법 순위
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
                    lineHeight: '19.09px',
                    fontWeight: 'bold',
                    width: '50px',
                  }}
                >
                  {data.rank}등
                </div>
                <div
                  style={{
                    width: 'calc(100% - 50px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>{data.setence}</div>
                  <div> {data.percentage}</div>
                </div>
              </Box>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

const Box = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  padding: 20px 12px;
  border: 1px solid #c4c4c4;
  border-top: ${(props) => (props.isEven ? '1px solid #c4c4c4' : 'none')};
  border-bottom: ${(props) =>
    props.isEven || props.isLast ? '1px solid #c4c4c4' : 'none'};
`;

export default LoginPage;

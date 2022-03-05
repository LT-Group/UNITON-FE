import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Box, flexbox } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { Router } from 'next/router';
import ColorButton from '../../src/components/common/ColorButton';
import Container from '../../src/components/common/Container';
import { removeCookie } from '../../token/TokenManager';
import { common } from '../../src/styles/common';

const userData = {
  username: '마춤뻐 파괘자', // 닉네임 (ID)
  paper_count: 3, // 총 시험지 수
  paper_list: [1, 2, 3], // paper_id,
  stamp: [1, 3, 4], // 도장 수 순서대로
};

const MyPageContainer = styled(Box)({
  position: 'absolute',
  alignItems: 'center',
});

const StyledTableContainer = styled(TableContainer)({
  width: '80%',
  border: '0.2px',
  borderStyle: 'solid',
  borderColor: '#443C22',
  boxShadow: 'none',
  borderRadius: '0px',
  borderCollapse: 'collapse',
  marginBottom: '32px',
});

const StyledTableCell = styled(TableCell)({
  outline: '0.5px solid',
  outlineColor: '#443C22',
  textAlign: 'left',
  fontSize: '14px',
  fontColor: '#443C22',
  backgroundColor: '#F8F0E9',
});

const StyledStampContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledStamp = styled.div`
  display: absolute;
  text-align: center;
  margin: 8px;
`;

const myPage = () => {
  const handleSignUp = () => {};
  const onLogout = () => {
    localStorage.removeItem('userName');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('acexpireAt');
    removeCookie('rfExpireAt');
    removeCookie('isLoading');
    removeCookie('isLogin');

    Router.replace('/login');
  };
  return (
    <Container bgColor={'#F8F0E9'}>
      <StyledTableContainer component={Paper}>
        <Table sx={{ Width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Typography variant="h5">생활기록부</Typography>
                  <ColorButton
                    width="10%"
                    text="로그아웃"
                    onClick={onLogout}
                  ></ColorButton>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="left">
                <Image
                  src="/image/profile.png"
                  alt="profile"
                  height="96"
                  width="80"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                로그인이 필요합니다.
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">받은 도장</StyledTableCell>
              <StyledTableCell align="right">
                <StyledStampContainer>
                  <StyledStamp>
                    <Image
                      src="/stamp/Good.svg"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography>0번</Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/stamp/Soso.svg"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography>0번</Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/stamp/Bad.svg"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography>0번</Typography>
                  </StyledStamp>
                </StyledStampContainer>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">시험</StyledTableCell>
              <StyledTableCell align="right">
                로그인이 필요합니다
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Link href="/login" passHref>
        <ColorButton width="100%" fontSize="16px" text="로그인"></ColorButton>
      </Link>
      <Link href="/signup" passHref>
        <ColorButton
          color="#443C22"
          bgColor="none"
          hoverBgColor="#F8F0E9"
          onClick="A9A69E"
          variant="contained"
          width="100%"
          fontSize="16px"
          text="회원가입"
        />
      </Link>
    </Container>
  );
};

export default myPage;

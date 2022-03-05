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
  width: '50vh',
  border: '0.2px',
  borderStyle: 'solid',
  borderColor: '#443C22',
  boxShadow: 'none',
  borderRadius: '0px',
  borderCollapse: 'collapse',
  marginBottom: '32px',
});

const StyledTableCell = styled(TableCell)({
  outline: '0.5px solid #443C22',
  textAlign: 'left',
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

const myPage = (handleSignUp) => {
  const onLogout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('acexpireAt');
    removeCookie('rfExpireAt');
    removeCookie('isLoading');
    removeCookie('isLogin');

    Router.replace('/login');
  };
  return (
    <Container>
      <MyPageContainer>
        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 320 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={2}>
                  <Typography variant="h6">생활기록부</Typography>
                  <ColorButton onClick={onLogout}></ColorButton>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell align="left">
                  <Image src="/image/profile.png" height="96" width="80" />
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
                      <Image src="/stamp/Good.svg" height="56" width="56" />
                      <Typography>0번</Typography>
                    </StyledStamp>
                    <StyledStamp>
                      <Image src="/stamp/Soso.svg" height="56" width="56" />
                      <Typography>0번</Typography>
                    </StyledStamp>
                    <StyledStamp>
                      <Image src="/stamp/Bad.svg" height="56" width="56" />
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

        <Link href="/login">
          <ColorButton text="로그인"></ColorButton>
        </Link>
        <Link href="/signup">
          <ColorButton
            color="#015B30"
            bgColor="none"
            hoverBgColor="#F8F0E9"
            onClick={handleSignUp}
            variant="contained"
            text="회원가입"
            variant="text"
          />
        </Link>
      </MyPageContainer>
    </Container>
  );
};

export default myPage;

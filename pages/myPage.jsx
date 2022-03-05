import {
  Button,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

const userData = {
  username: '마춤뻐 파괘자', // 닉네임 (ID)
  paper_count: 3, // 총 시험지 수
  paper_list: [1, 2, 3], // paper_id,
  stamp: [1, 3, 4], // 도장 수 순서대로
};

const StyledTableContainer = styled(TableContainer)({
  width: '50vh',
  border: '0.2px',
  borderStyle: 'solid',
  borderColor: '#443C22',
  boxShadow: 'none',
  borderRadius: '0px',
  borderCollapse: 'collapse',
});

const StyledTableCell = styled(TableCell)({
  outline: '0.5px solid #443C22',
  textAlign: 'left',
});

const myPage = () => {
  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>생활기록부</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="right">
                로그인이 필요합니다.
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">받은 도장</StyledTableCell>
              <StyledTableCell align="right">
                <Image src="/stamp/Good.svg" height="56" width="56" />
                <Image src="/stamp/Soso.svg" height="56" width="56" />
                <Image src="/stamp/Bad.svg" height="56" width="56" />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="right">시험</StyledTableCell>
              <StyledTableCell align="right">0회</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default myPage;

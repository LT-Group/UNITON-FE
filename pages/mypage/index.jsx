import React, { useState, useEffect } from 'react';
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
  Button,
} from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Box, flexbox } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ColorButton,
  Container,
  Navigation,
} from '../../src/components/common';
import { removeCookie, getCookie } from '../../token/TokenManager';
import { common } from '../../src/styles/common';
import { getApi } from '../../apis';

const StyledTableCell = styled(TableCell)({
  outline: '0.5px solid',
  outlineColor: '#C4C4C4',
  textAlign: 'left',
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

const MyPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(null);
  const [userID, setUserID] = useState(-1);
  const [userInfo, setUserInfo] = useState({});

  const kakaoID = '7867d65d97b436959a20d12a5bb1beae';

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoID);
      }
    }
  }, []);

  const kakaoSend = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(kakaoID);
      }
      window?.Kakao?.Link?.sendScrap({
        requestUrl: 'https://grammer-survive.netlify.app/',
      });
    }
  };
  useEffect(() => {
    const getData = async () => {
      setIsLogin(getCookie('isLogin'));
      const ID = localStorage.getItem('userID');
      setUserID(ID);

      // ID로 바꿀것
      const Info = await getApi.getUserInfo(ID);
      setUserInfo(Info);
    };
    getData();
  }, []);
  const onLogout = () => {
    localStorage.removeItem('userName');

    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('acexpireAt');
    removeCookie('rfExpireAt');
    removeCookie('isLoading');
    removeCookie('isLogin');
    router.replace('/');
  };

  if (!router) return null;

  if (!isLogin) {
    return (
      <Container bgColor={'#F8F0E9'}>
        <Table
          sx={{ width: '100%', marginBottom: '16px' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#443C22',
                    }}
                  >
                    생활기록부
                  </Typography>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ height: '12.6rem' }}>
              <StyledTableCell
                align="left"
                sx={{ padding: 0, height: '12.6rem', width: '10.2rem' }}
              >
                <ProfileImg
                  src="/image/mypage/profile_Default.png"
                  alt="profile"
                  style={{ objectFit: 'cover', height: '100%' }}
                />
              </StyledTableCell>

              <StyledTableCell
                align="right"
                sx={{ fontSize: '28px', fontWeight: 'bold' }}
              >
                로그인이
                <br />
                필요합니다.
                <div
                  style={{
                    fontSize: '14px',
                    marginTop: '20px',
                    marginBottom: '5px',
                    display: 'flex',
                    color: '#015B30',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>1학년</div>
                  <div style={{ opacity: '0.3' }}>2학년 진학&nbsp; 0/2</div>
                </div>
                <BorderLinearProgress variant="determinate" value={0} />
              </StyledTableCell>
            </TableRow>
            <TableRow sx={{ height: '12.6rem' }}>
              <StyledTableCell
                align="right"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                받은 도장
              </StyledTableCell>
              <StyledTableCell align="right">
                <StyledStampContainer>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-good.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      0개
                    </Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-soso.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      0개
                    </Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-bad.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      0개
                    </Typography>
                  </StyledStamp>
                </StyledStampContainer>
              </StyledTableCell>
            </TableRow>
            <TableRow sx={{ height: '2.4rem' }}>
              <StyledTableCell
                align="right"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                시험
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{
                  display: 'flex',
                  verticalAlign: 'flex-end',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                0회
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <ColorButton
          sx={{ fontSize: '16px', fontWeight: 'bold' }}
          color="white"
          bgColor={'#015B30'}
          hoverBgColor={'#015B30'}
          variant="contained"
          width={'100%'}
          height={'56px'}
          text="로그인"
          onClick={() => router.push('/login')}
        />
        <Link href="/signup" passHref>
          <Button
            sx={{
              color: '#015B30',
              height: '56px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            variant="text"
          >
            회원가입
          </Button>
        </Link>
        <style>{cssstyle}</style>
        <Navigation />
      </Container>
    );
  } else
    return (
      <Container bgColor={'#F8F0E9'}>
        <Table
          sx={{ width: '100%', marginBottom: '16px' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#443C22',
                    }}
                  >
                    생활기록부
                  </Typography>
                  <ColorButton
                    width="10%"
                    height="32px"
                    sx={{ fontSize: '12px' }}
                    text="로그아웃"
                    onClick={onLogout}
                  ></ColorButton>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ height: '12.6rem' }}>
              <StyledTableCell
                align="left"
                sx={{ padding: 0, height: '12.6rem', width: '10.2rem' }}
              >
                {userInfo.total_score_avg >= 90 ? (
                  <ProfileImg
                    src="/image/mypage/profile_Good.png"
                    alt="profile"
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                ) : userInfo.total_score_avg >= 70 ? (
                  <ProfileImg
                    src="/image/mypage/profile_Default.png"
                    alt="profile"
                    style={{ objectFit: 'cover' }}
                  />
                ) : userInfo.total_score_avg >= 30 ? (
                  <ProfileImg
                    src="/image/mypage/profile_SoSo.png"
                    alt="profile"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <ProfileImg
                    src="/image/mypage/profile_Bad.png"
                    alt="profile"
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                <div>
                  {userInfo.total_score_avg >= 90 ? (
                    <div
                      style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.68rem',
                        fontWeight: '400',
                      }}
                    >
                      전생 집현전 학자
                    </div>
                  ) : userInfo.total_score_avg >= 70 ? (
                    <div
                      style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.68rem',
                        fontWeight: '400',
                      }}
                    >
                      바른생활 어린이
                    </div>
                  ) : userInfo.total_score_avg >= 30 ? (
                    <div
                      style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.68rem',
                        fontWeight: '400',
                      }}
                    >
                      마춤뻡 파괘자
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.68rem',
                        fontWeight: '400',
                      }}
                    >
                      국적 소멸 위기
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '2.8rem', lineHieght: '3.36rem' }}>
                  {userInfo?.username ? userInfo?.username : '...'}
                </div>
                {Math.ceil(userInfo?.paper_count / 2) > 6 ||
                (Math.ceil(userInfo?.paper_count / 2) == 6 &&
                  userInfo.dictionary.paper_count / 2 == 0) ? (
                  <>
                    <div
                      style={{
                        fontSize: '14px',
                        marginTop: '2.6rem',
                        marginBottom: '5px',
                        display: 'flex',
                        color: '#015B30',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>{Math.ceil(userInfo?.paper_count / 2)}학년</div>
                      <div>졸업 🎉</div>
                    </div>
                    <BorderLinearProgress variant="determinate" value={100} />
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: '14px',
                        marginTop: '2.6rem',
                        marginBottom: '5px',
                        display: 'flex',
                        color: '#015B30',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>{Math.ceil(userInfo?.paper_count / 2)}학년</div>
                      <div style={{ opacity: '0.3' }}>
                        {Math.ceil(userInfo?.paper_count / 2) + 1}학년
                        진학&nbsp;
                        {userInfo?.paper_count % 2}/2
                      </div>
                    </div>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(userInfo?.paper_count % 2) * 50}
                    />
                  </>
                )}
              </StyledTableCell>
            </TableRow>
            <TableRow sx={{ height: '12.6rem' }}>
              <StyledTableCell
                align="right"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                받은 도장
              </StyledTableCell>
              <StyledTableCell align="right">
                <StyledStampContainer>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-good.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      {userInfo?.stamp_counts?.[0]}개
                    </Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-soso.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      {userInfo?.stamp_counts?.[1]}개
                    </Typography>
                  </StyledStamp>
                  <StyledStamp>
                    <Image
                      src="/image/mypage/stamp-bad.png"
                      alt="stamp"
                      height="56"
                      width="56"
                    />
                    <Typography sx={{ fontSize: '12px', marginTop: '7px' }}>
                      {userInfo?.stamp_counts?.[2]}개
                    </Typography>
                  </StyledStamp>
                </StyledStampContainer>
              </StyledTableCell>
            </TableRow>
            <TableRow sx={{ height: '2.4rem' }}>
              <StyledTableCell
                align="right"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                시험
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{
                  display: 'flex',
                  verticalAlign: 'flex-end',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#443C22',
                }}
              >
                {userInfo.paper_count}회 / 평균 {userInfo.total_score_avg}점
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div
          style={{
            width: '18.2rem',
            height: '3rem',
            backgroundColor: '#C02C3D',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: 'white',
            borderRadius: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={kakaoSend}
        >
          마춤뻡에서 살아남기 공유하기
        </div>
        <div
          style={{
            width: '100%',
            borderTop: '0.12rem solid #E5E5E5',
            margin: '1.6rem 0 2rem 0',
          }}
        ></div>
        <Imgcontainer height={userInfo?.paper_list?.length * 207}>
          {userInfo?.paper_list?.length > 0 &&
            userInfo?.paper_list.map((id, index) => {
              return (
                <div key={id}>
                  <img
                    onClick={() => {
                      router.push(`/mypage/${id}`);
                    }}
                    src="/image/main/onboarding-1.png"
                    style={{ width: '159px' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      width: '159px',
                      padding: '0 14px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '30px',
                        fontSize: '12px',
                        backgroundColor: '#015B30',
                        marginTop: '-45px',
                        borderRadius: '4px',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      제{index + 1}회
                    </div>
                  </div>
                </div>
              );
            })}
        </Imgcontainer>
        <style>{cssstyle}</style>
        <Navigation />
      </Container>
    );
};

export default MyPage;
const cssstyle = `
.css-12j2wjg-MuiTableCell-root{
  margin-top:-20px;
}
`;

const Imgcontainer = styled.div`
  width: calc(100% + 48px);
  padding: 0 24px;
  background-color: #f8f0e9;
  padding-bottom: 110px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: center;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const ProfileImg = styled.div`
  background: url(${(props) => props.src}) center center / cover;
  background-color: #dedede;
  width: 100%;
  height: 100%;
`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: `rgba(1, 91, 48, 0.3)`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `rgba(1, 91, 48, 1)`,
  },
}));

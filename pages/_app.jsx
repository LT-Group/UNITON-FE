import '../styles/globals.css';
import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
// moment
import moment from 'moment';
// axios
import axios from 'axios';
// router
import router from 'next/router';
import { postApi } from '../apis';
// token
import {
  getCookie,
  setCookie,
  removeCookie,
  COOKIE_OPTION,
} from '../token/TokenManager';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      const acExpireAt = getCookie('acexpireAt');
      const rfExpireAt = getCookie('rfExpireAt');
      const isLoading = getCookie('isLoading');

      const isLogin = getCookie('isLogin');
      console.log(isLoading);
      console.log(isLogin);
      console.log(accessToken);
      // 토큰이 없는 경우, 로그아웃
      if (
        (accessToken === undefined && isLoading !== true) ||
        (!isLogin && isLoading !== true)
      ) {
        console.log('hi');
        localStorage.removeItem('userName');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('acexpireAt');
        removeCookie('rfExpireAt');
        removeCookie('isLoading');
        removeCookie('isLogin');
        // 메인 페이지가 아닌 경우 -> 메인페이지로 이동
        if (
          router.router.asPath !== '/login' &&
          router.router.asPath !== '/signup' &&
          router.router.asPath !== '/mypage'
        )
          router.replace('/');
      } else if (isLogin) {
        // accessToken 만료, refreshToken 유효 -> refreshToken으로 token 재발급
        if (
          moment(acExpireAt).diff(moment()) < 0 &&
          refreshToken &&
          moment(rfExpireAt).diff(moment()) > 0
        ) {
          const token = await postApi.postRefreshToken({
            refresh: refreshToken,
          });
          const date = moment();
          const acexpireAt = new Date();
          acexpireAt.setDate(acexpireAt.getDate() + 2);

          const rfExpireAt = new Date();
          rfExpireAt.setDate(rfExpireAt.getDate() + 8);
          setCookie('isLogin', true, {
            path: '/',
            ...COOKIE_OPTION,
            expires: rfExpireAt,
          });
          setCookie('accessToken', token.access, {
            path: '/',
            ...COOKIE_OPTION,
            expires: acexpireAt,
          });
          setCookie('refreshToken', token.refresh, {
            path: '/',
            ...COOKIE_OPTION,
            expires: rfExpireAt,
          });
          setCookie(
            'acexpireAt',
            date.add(1, 'days').format('yyyy-MM-DD HH:mm:ss'),
            {
              path: '/',
              ...COOKIE_OPTION,
              expires: acexpireAt,
            },
          );
          setCookie(
            'rfExpireAt',
            date.add(7, 'days').format('yyyy-MM-DD HH:mm:ss'),
            {
              path: '/',
              ...COOKIE_OPTION,
              expires: rfExpireAt,
            },
          );
        }
        // accessToken 만료, refreshToken 만료 -> 자동 로그아웃
        else if (
          moment(acExpireAt).diff(moment()) < 0 &&
          moment(rfExpireAt).diff(moment()) < 0
        ) {
          localStorage.removeItem('userName');
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('acexpireAt');
          removeCookie('rfExpireAt');
          removeCookie('isLoading');
          removeCookie('isLogin');
          router.push('/');
        }
      }
    };
    fetchData();
  });

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = getCookie('accessToken');

    if (
      token !== undefined &&
      token !== 'undefined' &&
      !config.url.includes('login') &&
      !config.url.includes('checkid')
    )
      config.headers.Authorization = `JWT ${token}`;
    console.log(config);
    //console.log(token);
    return config;
  });

  return (
    <>
      <Head>
        <title>마춤뻡에서 살아남기 </title>
        <meta
          name="description"
          content="맞춤법을 틀리는 당신, 받아쓰기를 해보시죠"
        />
        <meta
          property="og:url"
          content="https://grammer-survive.netlify.app/"
        />
        <meta property="og:title" content="마춤뻡에서 살아남기" />
        <meta
          property="og:description"
          content="세종대왕님이 노하시기 전에 받아쓰기를 연습하자!"
        />
        <meta property="og:image" content="/thumnail.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <CssBaseline />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;

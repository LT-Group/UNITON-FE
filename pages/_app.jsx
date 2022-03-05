import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';
// moment
import moment from 'moment';
// axios
import axios from 'axios';
// router
import router from 'next/router';
// token
import {
  getCookie,
  setCookie,
  removeCookie,
  COOKIE_OPTION,
} from '../token/TokenManager';

const MyApp = ({ Component, pageProps }) => {
  useEffect(async () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    const acExpireAt = getCookie('acexpireAt');
    const rfExpireAt = getCookie('rfExpireAt');
    const isLoading = getCookie('isLoading');

    const isLogin = localStorage.getItem('isLogin');
    // 토큰이 없는 경우, 로그아웃
    if (
      (accessToken === 'undefined' || accessToken === undefined) &&
      isLoading !== true
    ) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      removeCookie('acexpireAt');
      removeCookie('rfExpireAt');
      removeCookie('isLoading');
      // 메인 페이지가 아닌 경우 -> 메인페이지로 이동
      if (
        router.router.asPath !== '/' &&
        router.router.asPath !== '/login' &&
        router.router.asPath !== '/signup'
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
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('acexpireAt');
        removeCookie('rfExpireAt');
        removeCookie('isLoading');
        router.push('/');
      }
    }
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
    // console.log(config);
    //console.log(token);
    return config;
  });

  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;

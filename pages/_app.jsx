import '../styles/globals.css';

import { CssBaseline } from '@mui/material';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }) => {
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

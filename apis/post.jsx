import axios from 'axios';

const signup = async (body) => {
  // console.log(body);
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/register/`,
      method: 'post',
      data: body,
    });
    // console.log('[SUCCESS] SIGNUP', data);
    return data;
  } catch (e) {
    // console.log('[FAIL] SIGNUP', e);
    return e;
  }
};

const checkID = async (body) => {
  // console.log(body);
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/checkid/`,
      method: 'post',
      data: body,
    });
    // console.log('[SUCCESS] CHECK USER ID', data);
    return data;
  } catch (e) {
    // console.log('[FAIL] CHECK USER ID', e);
    return e;
  }
};
const login = async (body) => {
  // console.log(body);
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/login/`,
      method: 'post',
      data: body,
    });
    // console.log('[SUCCESS] LOGIN', data);
    return data;
  } catch (e) {
    // console.log('[FAIL] LOGIN', e);
    return e;
  }
};

const getToken = async (body) => {
  // console.log(body);
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/token/refresh/`,
      method: 'post',
      data: body,
    });
    // console.log('[SUCCESS] GET TOKEN', data);
    return data;
  } catch (e) {
    // console.log('[FAIL] GET TOKEN', e);
    return e;
  }
};

const submitAnswer = async (body) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `papers/post_paper/`,
      method: 'post',
      data: body,
    });

    return data;
  } catch (e) {
    return e;
  }
};

const postApi = {
  signup,
  checkID,
  login,
  getToken,
  submitAnswer,
};
export default postApi;

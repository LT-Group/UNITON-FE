import axios from 'axios';

const getUserID = async (name) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/get_user_id/?username=${name}`,
      method: 'get',
    });
    console.log('[SUCCESS] GET USER ID', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET USER ID', e);
    return e;
  }
};

const getRankingData = async () => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/papers/question_rank/`,
      method: 'get',
    });
    console.log('[SUCCESS] GET RANKING DATA', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET RANKING DATA', e);
    return e;
  }
};

const getTestData = async (ID) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/papers/get_paper/${ID}/`,
      method: 'get',
    });
    console.log('[SUCCESS] GET TEST DATA', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET TEST DATA', e);
    return e;
  }
};

const getTestCount = async (ID) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/papers/count_paperuser/${ID}/`,
      method: 'get',
    });
    console.log('[SUCCESS] GET TEST COUNT', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET TEST COUNT', e);
    return e;
  }
};

const getAllTestCount = async () => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/papers/paper_count/`,
      method: 'get',
    });
    console.log('[SUCCESS] GET ALL TEST COUNT', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET ALL TEST COUNT', e);
    return e;
  }
};

const getUserInfo = async (ID) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/accounts/my_profile/${ID}/`,
      method: 'get',
    });
    console.log('[SUCCESS] GET USER INFO', data);
    return data;
  } catch (e) {
    console.log('[FAIL] GET USER INFO', e);
    return e;
  }
};

const getTestResult = async ({ userId, paperId }) => {
  try {
    const { data } = await axios({
      baseURL: API_DOMAIN,
      url: `/papers/get_paper_detail/${userId}/${paperId}/`,
      method: 'get',
    });

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getApi = {
  getUserID,
  getRankingData,
  getTestData,
  getTestCount,
  getAllTestCount,
  getUserInfo,
  getTestResult,
};
export default getApi;

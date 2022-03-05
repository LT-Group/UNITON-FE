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

const getApi = {
  getUserID,
  getRankingData,
};
export default getApi;

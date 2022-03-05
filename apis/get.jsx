import axios from 'axios';

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
  getRankingData,
};
export default getApi;

import { atom } from 'recoil';

export const UserInfoState = {
  userName: '',
  page_id: 0,
  entire_count: 0,
};

export const UserInfo = atom({
  key: 'UserInfo',
  default: UserInfoState,
});

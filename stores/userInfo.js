import { atom } from 'recoil';

export const UserInfoState = {
  userName: '',
  count: 0,
  entire_count: 0,
};

export const UserInfo = atom({
  key: 'UserInfo',
  default: UserInfoState,
});

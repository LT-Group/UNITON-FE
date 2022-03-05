import { atom, atomFamily } from 'recoil';

export const userTestStart = atom({
  key: 'userTestStart',
  default: false,
});

export const testSound = atom({
  key: 'testSound',
  default: null,
});
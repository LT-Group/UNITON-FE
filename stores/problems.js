import { atom } from 'recoil';

export const problemsInitialState = {
  problem0: '',
  problem1: '',
  problem2: '',
  problem3: '',
  problem4: '',
};

export const problemsState = atom({
  key: 'ProblomsState',
  default: problemsInitialState,
});

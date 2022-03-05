import { atom } from 'recoil';

export const problemsInitialState = [
  0,
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
];

export const ProblemsState = atom({
  key: 'ProblomsState',
  default: problemsInitialState,
});

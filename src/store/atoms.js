import { atom } from 'recoil';

export const problemsInitialState = [
  0,
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
  { input: '', answer: '' },
];

const mockData = [
  40,
  { input: '', answer: '안녕' },
  { input: '', answer: '하이' },
  { input: '', answer: '바이' },
  { input: '', answer: '' },
  { input: '', answer: '' },
];

export const ProblemsState = atom({
  key: 'ProblomsState',
  default: problemsInitialState,
});

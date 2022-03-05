export const getStamp = (scoreAny) => {
  const score = Number(scoreAny);

  if (score >= 80) {
    return 'Good';
  } else if (score >= 60) {
    return 'Soso';
  } else {
    return 'Bad';
  }
};

export const getDate = (inputDate) => {
  const date = inputDate ? new Date(inputDate) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}년 ${month}월 ${day}일`;
};

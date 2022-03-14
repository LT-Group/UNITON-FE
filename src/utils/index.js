export const getStamp = (scoreAny) => {
  const score = Number(scoreAny);
  // console.log(score);
  if (score >= 80) {
    return 'Good';
  } else if (score >= 60) {
    return 'Soso';
  }

  return 'Bad';
};

export const getDate = (inputDate) => {
  let date = new Date();
  if (inputDate) date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

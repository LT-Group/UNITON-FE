import React, { useEffect, useState } from 'react';
import { getApi } from '../../../apis';
import WritePaper from '../../../src/components/WritePaper';
import { useRecoilState } from 'recoil';
import { Container } from '../../../src/components/common';
import { userPaperId } from '../../../stores/paperId';

const WritePage = () => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [paperId, setPaper] = useRecoilState(userPaperId);
  const controlAudio = () => setPlaying(!playing);
  const stopAudio = () => setPlaying(false);

  useEffect(() => {
    const getData = async () => {
      const userId = localStorage.getItem('userID');
      const { paper_id, file } = await getApi.getTestData(userId);

      setPaper(paper_id);
      // setAudio(new Audio('../../../audio/story1page3.mp3'));
      setAudio(new Audio(file));
    };

    getData();
  }, []);

  //오디오 상태 변경 후 처음 시작할 때
  useEffect(() => {
    if (!audio) return;

    audio.addEventListener('ended', stopAudio);

    setTimeout(() => setPlaying(true), [100]);

    return audio.removeEventListener('ended', stopAudio);
  }, [audio]);

  //오디오 버튼 클릭 시 일어나는 함수
  useEffect(() => {
    if (!audio) return;

    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  return (
    <Container bgColor={'#F8F0E9'}>
      <WritePaper
        isButton={true}
        controlAudio={controlAudio}
        isPlay={playing}
        stopAudio={stopAudio}
      />
    </Container>
  );
};

export default WritePage;

// url 직접 접근 방지
// export async function getServerSideProps({ req, res, params }) {
//   if (!req.headers.referer) {
//     res.statusCode = 302;
//     res.setHeader('Location', `/`);
//     res.end();
//   }
//   return { props: {} };
// }

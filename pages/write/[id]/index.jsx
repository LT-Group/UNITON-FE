import React, { useEffect, useState } from 'react';
import { getApi } from '../../../apis';
import WritePaper from '../../../src/components/WritePaper';
import { useRecoilState } from 'recoil';
import { userTestStart, testSound } from '../../../stores/write';
import { Container } from '../../../src/components/common';

const WritePage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(userTestStart);
  const [audio, setAudio] = useRecoilState(testSound);

  const [playing, setPlaying] = useState(null);
  const [paperId, setPaper] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ID = await localStorage.getItem('userID');
    const data = await getApi.getTestData(ID);
    console.log(data);
    setPaper(() => data.paper_id);
    setAudio(new Audio(data.file));
  };

  useEffect(() => {
    if ((!isModalOpen, audio)) {
      setTimeout(() => {
        setPlaying(true);
        setIsFirstTime(false);
      }, [100]);
    }
  }, [isModalOpen, audio]);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio?.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio?.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio?.removeEventListener('ended', () => setPlaying(false));
      };
    }
  }, [audio, playing]);

  return (
    <Container bgColor={'#F8F0E9'}>
      <WritePaper
        isButton={true}
        onToggle={toggle}
        isPlay={playing}
        paperId={paperId}
      />
    </Container>
  );
};

export default WritePage;

// url 직접 접근 방지
export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.referer) {
    res.statusCode = 302;
    res.setHeader('Location', `/`);
    res.end();
  }
  return { props: {} };
}

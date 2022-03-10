import React, { useEffect, useState } from 'react';
import { getApi } from '../../../apis';
import WritePaper from '../../../src/components/WritePaper';
import { useRecoilState } from 'recoil';
import { userTestStart, testSound } from '../../../stores/write';
import { Container } from '../../../src/components/common';
import { userPaperId } from '../../../stores/paperId';

const WritePage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(userTestStart);
  const [audio, setAudio] = useRecoilState(testSound);

  const [playing, setPlaying] = useState(null);
  const [paperId, setPaper] = useRecoilState(userPaperId);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    getData();

    return () => setAudio(null);
  }, []);

  const getData = async () => {
    const userId = localStorage.getItem('userID');
    const { paper_id, file } = await getApi.getTestData(userId);

    setPaper(paper_id);
    setAudio(new Audio(file));
  };

  useEffect(() => {
    if ((!isModalOpen, audio)) {
      setTimeout(() => {
        setPlaying(true);
      }, [100]);
    }
  }, [isModalOpen, audio]);

  const toggle = () => setPlaying((playing) => !playing);
  const removeToggle = () => setPlaying(false);

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
        removeToggle={removeToggle}
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

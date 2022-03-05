import React, { useEffect, useState } from 'react';
import { getApi } from '../../../apis';
import WritePaper from '../../../src/components/WritePaper';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userTestStart } from '../../../stores/write';

const WritePage = () => {
  const [testData, setTestData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useRecoilState(userTestStart);

  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(null);
  const router = useRouter();
  useEffect(() => {
    getData(router?.query?.id);
  }, [router?.query?.id]);

  const getData = async (userID) => {
    const data = await getApi.getTestData(userID);
    setTestData(data);

    setAudio(new Audio(data.file));
  };

  useEffect(() => {
    if ((!isModalOpen, audio)) {
      setTimeout(() => {
        audio.play();
      }, [300]);
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
    <>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      <WritePaper />
    </>
  );
};

export default WritePage;

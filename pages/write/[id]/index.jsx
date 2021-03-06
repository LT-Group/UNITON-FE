import React, { useEffect, useRef, useState } from 'react';
import { getApi } from '../../../apis';
import WritePaper from '../../../src/components/WritePaper';
import { useRecoilState } from 'recoil';
import { Container } from '../../../src/components/common';
import { userPaperId } from '../../../stores/paperId';
import { getTestProblems } from '../../../src/utils';

class TestAudios {
  currentPlaying = null;

  constructor(testProblems) {
    this.testProblems = testProblems;
  }

  play(name) {
    if (this.currentPlaying) {
      this.testProblems[this.currentPlaying].pause();
    }
    this.testProblems[name].play();
    this.currentPlaying = name;
  }

  pause(name) {
    this.currentPlaying = null;
    this.testProblems[name].pause();
  }
}

const WritePage = () => {
  const [paperId, setPaper] = useRecoilState(userPaperId);
  const [isPlayAudio, setIsPlayAudio] = useState(false);
  const testSound = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const userId = localStorage.getItem('userID');
      const { paper_id, file, question_url_list } = await getApi.getTestData(
        userId,
      );
      const testProblems = getTestProblems({
        total: file,
        restProblems: question_url_list,
      });

      testSound.current = new TestAudios(testProblems);
      testSound.current?.play('total');
      setIsPlayAudio('total');
      setPaper(paper_id);
    };

    getData();

    return () => testSound.current?.pause(testSound.current.currentPlaying);
  }, []);

  const soundClick = (e) => {
    const { id } = e.target;
    if (!id || !testSound.current) return;

    if (id === 'total') {
      if (isPlayAudio === 'total') {
        testSound.current.pause('total');
        setIsPlayAudio(false);
      } else {
        testSound.current.play('total');
        setIsPlayAudio('total');
      }
      return;
    }

    if (id === testSound.current.currentPlaying) {
      testSound.current.pause(id);
      setIsPlayAudio(false);
    } else {
      testSound.current.play(id);
      setIsPlayAudio(id);
    }
  };

  return (
    <Container bgColor={'#F8F0E9'}>
      <WritePaper
        isPlayAudio={isPlayAudio}
        soundClick={soundClick}
        isButton={true}
      />
    </Container>
  );
};

export default WritePage;

// url ?????? ?????? ??????
// export async function getServerSideProps({ req, res, params }) {
//   if (!req.headers.referer) {
//     res.statusCode = 302;
//     res.setHeader('Location', `/`);
//     res.end();
//   }
//   return { props: {} };
// }

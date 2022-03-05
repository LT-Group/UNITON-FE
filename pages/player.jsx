import React, { useState, useEffect } from 'react';
const Player = ({}) => {
  const url = '/audio/story1page3.mp3';
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAudio(new Audio(url));
    });
  }, []);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio?.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    if (audio) {
      if (playing === null) {
        audio.play();
      }
      audio?.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio?.removeEventListener('ended', () => setPlaying(false));
      };
    }
  }, [audio]);

  return (
    <div>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default Player;

import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGame from '../../stores/useGame';
import Modal from '../../components/modal/Modal';
import MainButton from '../../components/mainButton/MainButton';
import HelpButton from '../../components/helpButton/HelpButton';

export const Home = () => {
  const navigate = useNavigate();
  const { modal, resetRevealed, setPhase } = useGame();

  useEffect(() => {
    setPhase('ready');
    resetRevealed();
  }, []);

  const handlePlay = () => {
    navigate('/play');
  };

  return (
    <div className="home-page">
      <div className="home-page-logo" />
      <MainButton handleClick={handlePlay} text="PLAY" />
      <HelpButton />
      <div className="copyright">
        <a
          href="http://michaelkolesidis.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          © Michael Kolesidis
        </a>
        <a
          href="https://github.com/michaelkolesidis/scratch-bonanza"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      {modal && <Modal />}
    </div>
  );
};

import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGame from "../../stores/useGame";
import { Modal } from "../../components/modal/Modal";

export const Home = () => {
  const navigate = useNavigate();
  const { modal, setModal, resetRevealed } = useGame();

  useEffect(() => {
    resetRevealed();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-logo" />
      <div onClick={() => navigate("/play")} className="button-main">
        PLAY
      </div>
      <div onClick={() => setModal(true)} className="help-button" />
      {modal && <Modal />}
    </div>
  );
};

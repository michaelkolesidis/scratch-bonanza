import "./style.css";
import useGame from "../../stores/useGame";

export const Modal = () => {
  const { setModal } = useGame();

  return (
    <div className="modal" onClick={() => setModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">HOW TO PLAY</div>
        <div className="modal-main">
          <div className="modal-text">
            Players need to virtually ‘scratch-off’ the designated areas to
            uncover the rewards.
          </div>
          <div className="modal-text">
            If you are on your phone, touch the one of the areas and simply move
            your finger to scratch.
          </div>
          <div className="modal-text">
            If you are on your computer, click on one of the areas and move your
            mouse around.
          </div>
          <div className="modal-text">Scratch your way to great prizes!</div>
        </div>
      </div>
    </div>
  );
};

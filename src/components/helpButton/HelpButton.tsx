import "./style.css";
import useGame from "../../stores/useGame";

const HelpButton = () => {
  const { setModal } = useGame();

  const handleHelp = () => {
    setModal(true);
  };

  return <div onClick={handleHelp} className="help-button" />;
};

export default HelpButton;

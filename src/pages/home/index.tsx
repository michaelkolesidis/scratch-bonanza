import "./style.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-page-logo" />
      <div onClick={() => navigate("/play")} className="button-main">
        PLAY
      </div>
      <div
        onClick={() => console.log("Help modal opened!")}
        className="help-button"
      />
    </div>
  );
};

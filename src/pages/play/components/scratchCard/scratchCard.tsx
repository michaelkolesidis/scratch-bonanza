import "./style.css";
import ScratchArea from "../scratchArea/scratchArea";

interface IScratchCardProps {
  card: (0 | 10 | 100 | 1000)[];
}

const Card = ({ card }: IScratchCardProps) => {
  console.log(card);

  return (
    <div className="card">
      <ScratchArea value={card[0]} />
      <ScratchArea value={card[1]} />
      <ScratchArea value={card[2]} />
      <ScratchArea value={card[3]} />
    </div>
  );
};

export default Card;

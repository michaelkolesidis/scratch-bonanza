import "./style.css";

const MainButton = ({
  handleClick,
  text,
  disabled,
}: {
  handleClick: () => void;
  text: string;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={handleClick}
      className={`button-main ${disabled && "disabled-button"}`}
    >
      {text}
    </div>
  );
};

export default MainButton;

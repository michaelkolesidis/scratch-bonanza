// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

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

// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

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

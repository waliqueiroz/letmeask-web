import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button type="button" onClick={copyRoomCodeToClipboard} className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>
        Sala #
        {code}
      </span>
    </button>
  );
};

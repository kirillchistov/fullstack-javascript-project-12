import Button from 'react-bootstrap/Button';

const ChannelHeader = ({ onAddChannel }) => (
  <div className="d-flex justify-content-between align-items-center mb-2 px-4 py-2 shadow-sm">
    <b>Каналы</b>
    <Button
      variant="light"
      className="p-0 text-primary"
      onClick={() => onAddChannel('adding')}
      aria-label="Добавить канал"
    >
      +
    </Button>
  </div>
);

export default ChannelHeader;

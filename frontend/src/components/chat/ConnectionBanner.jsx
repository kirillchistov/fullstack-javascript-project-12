import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { getConnectionStatus } from '../../store/uiSlice.js';

const ConnectionBanner = () => {
  const connectionStatus = useSelector(getConnectionStatus);

  if (connectionStatus === 'online') {
    return null;
  }

  return (
    <Alert variant="warning" className="rounded-0 mb-0 text-center">
      Нет соединения. Сообщения не будут отправляться, пока сеть не восстановится.
    </Alert>
  );
};

export default ConnectionBanner;

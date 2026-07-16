import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { getConnectionStatus } from '../../store/uiSlice.js';

const ConnectionBanner = () => {
  const { t } = useTranslation();
  const connectionStatus = useSelector(getConnectionStatus);

  if (connectionStatus === 'online') {
    return null;
  }

  return (
    <Alert variant="warning" className="rounded-0 mb-0 text-center">
      {t('chat.connection.offline')}
    </Alert>
  );
};

export default ConnectionBanner;

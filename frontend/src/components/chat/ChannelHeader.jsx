import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const ChannelHeader = ({ onAddChannel }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between align-items-center mb-2 px-4 py-2 shadow-sm">
      <b>{t('chat.headerChannel.title')}</b>
      <Button
        variant="light"
        className="p-0 text-primary"
        onClick={() => onAddChannel('adding')}
      >
        +
      </Button>
    </div>
  );
};

export default ChannelHeader;

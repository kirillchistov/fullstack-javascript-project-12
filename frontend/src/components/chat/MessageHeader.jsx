import { useTranslation } from 'react-i18next';

const MessageHeader = ({ channelName, messagesCount }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-3 p-3 shadow-sm small">
      <b>{`# ${channelName}`}</b>
      <div className="text-muted">
        {t('chat.headerMessage.messageCount.message', { count: messagesCount })}
      </div>
    </div>
  );
};

export default MessageHeader;

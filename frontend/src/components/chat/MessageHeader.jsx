const MessageHeader = ({ channelName, messagesCount }) => (
  <div className="bg-light mb-3 p-3 shadow-sm small">
    <b>{`# ${channelName}`}</b>
    <div className="text-muted">
      {`Сообщений: ${messagesCount}`}
    </div>
  </div>
);

export default MessageHeader;

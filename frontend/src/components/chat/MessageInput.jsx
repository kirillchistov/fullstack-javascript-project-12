import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { getCurrentUser } from '../../store/authSlice.js';
import { useAddMessageMutation } from '../../store/messagesApi.js';
import { getConnectionStatus } from '../../store/uiSlice.js';

const MessageInput = ({ activeChannel }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const inputRef = useRef(null);
  const username = useSelector(getCurrentUser);
  const connectionStatus = useSelector(getConnectionStatus);
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const isOffline = connectionStatus === 'offline';

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChannel?.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading || isOffline || !activeChannel?.id) {
      return;
    }

    setSubmitError(null);

    try {
      await addMessage({
        body: trimmedMessage,
        channelId: activeChannel.id,
        username,
      }).unwrap();
      setMessage('');
      inputRef.current?.focus();
    } catch {
      setSubmitError(t('chat.input.submitError'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-auto">
      {submitError && (
        <div className="text-danger small mb-2">{submitError}</div>
      )}
      <InputGroup>
        <Form.Control
          name="body"
          placeholder={isOffline
            ? t('chat.input.offlinePlaceholder')
            : t('chat.input.placeholder')}
          aria-label={t('chat.input.label')}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isLoading || isOffline}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || isOffline || !message.trim()}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status">
              <span className="visually-hidden">{t('buttons.sending')}</span>
            </Spinner>
          ) : (
            t('buttons.send')
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;

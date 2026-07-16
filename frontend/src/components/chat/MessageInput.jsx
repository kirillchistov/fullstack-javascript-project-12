import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MessageInput = ({ activeChannelId }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChannelId]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-auto">
      <InputGroup>
        <Form.Control
          name="body"
          placeholder="Введите сообщение..."
          aria-label="Новое сообщение"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          ref={inputRef}
        />
        <Button type="submit" variant="primary">
          Отправить
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;

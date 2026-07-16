import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRemoveChannelMutation } from '../store/channelsApi.js';

const RemoveChannel = ({ onHide, modalChannel }) => {
  const { id, name } = modalChannel.channel;
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const handleDelete = async () => {
    try {
      await removeChannel(id).unwrap();
      onHide();
    } catch {
      // keep modal open on error
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          {`Вы уверены, что хотите удалить канал # ${name}?`}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;

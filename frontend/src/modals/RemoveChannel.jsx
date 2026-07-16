import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRemoveChannelMutation } from '../store/channelsApi.js';

const RemoveChannel = ({ onHide, modalChannel }) => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          {t('modal.removeChannel.confirm', { name })}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? t('buttons.deleting') : t('buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;

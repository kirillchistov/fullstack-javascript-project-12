import { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createChannelSchema } from '../utils/channelValidation.js';
import { useEditChannelMutation } from '../store/channelsApi.js';

const RenameChannel = ({ onHide, channelNames, modalChannel }) => {
  const { id, name: currentName } = modalChannel.channel;
  const [editChannel, { isLoading }] = useEditChannelMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await editChannel({ id, name: values.name.trim() }).unwrap();
      onHide();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: currentName }}
        validationSchema={createChannelSchema(channelNames, currentName)}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit: submitForm,
          handleChange,
          values,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={submitForm}>
            <Modal.Body>
              <Form.Group controlId="renameChannelName">
                <Form.Label className="visually-hidden">Имя канала</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  ref={inputRef}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.name)}
                  disabled={isLoading || isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide} disabled={isLoading || isSubmitting}>
                Отменить
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || isSubmitting}>
                {isLoading || isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannel;

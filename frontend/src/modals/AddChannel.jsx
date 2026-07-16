import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createChannelSchema } from '../utils/channelValidation.js';
import { useAddChannelMutation } from '../store/channelsApi.js';
import { setActiveChannel } from '../store/uiSlice.js';

const AddChannel = ({ onHide, channelNames }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addChannel, { isLoading }] = useAddChannelMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await addChannel({ name: values.name.trim() }).unwrap();
      dispatch(setActiveChannel(response));
      onHide();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={createChannelSchema(channelNames, t)}
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
              <Form.Group controlId="addChannelName">
                <Form.Label className="visually-hidden">
                  {t('modal.addChannel.name')}
                </Form.Label>
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
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || isSubmitting}>
                {isLoading || isSubmitting ? t('buttons.sending') : t('buttons.send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannel;

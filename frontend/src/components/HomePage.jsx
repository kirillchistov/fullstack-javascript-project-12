import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelHeader from './chat/ChannelHeader.jsx';
import ChannelList from './chat/ChannelList.jsx';
import ConnectionBanner from './chat/ConnectionBanner.jsx';
import MessageHeader from './chat/MessageHeader.jsx';
import MessageInput from './chat/MessageInput.jsx';
import MessageList from './chat/MessageList.jsx';
import LoadingSpinner from './Spinner.jsx';
import getModal from '../modals/index.js';
import { useGetChannelsQuery } from '../store/channelsApi.js';
import { useGetMessagesQuery } from '../store/messagesApi.js';
import {
  getCurrentActiveChannel,
  getCurrentModalChannel,
  setActiveChannel,
  setDefaultChannel,
  setModalChannel,
} from '../store/uiSlice.js';

const getGeneralChannel = (channels) => (
  channels.find((channel) => channel.name === 'general') ?? channels[0]
);

const renderModal = ({
  modalChannel,
  hideModal,
  channelNames,
}) => {
  if (!modalChannel.type) {
    return null;
  }

  const ModalComponent = getModal(modalChannel.type);

  return (
    <ModalComponent
      onHide={hideModal}
      modalChannel={modalChannel}
      channelNames={channelNames}
    />
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector(getCurrentActiveChannel);
  const modalChannel = useSelector(getCurrentModalChannel);
  const channelId = activeChannel?.id;

  const { data: channels = [], isLoading: isLoadingChannels } = useGetChannelsQuery();
  const { data: channelMessages = [], isLoading: isLoadingMessages } = useGetMessagesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.filter((message) => message.channelId === channelId) ?? [],
      isLoading,
    }),
  });

  useEffect(() => {
    if (!channels.length) {
      return;
    }

    const generalChannel = getGeneralChannel(channels);
    dispatch(setDefaultChannel(generalChannel));

    const hasActiveChannel = channels.some((channel) => channel.id === activeChannel?.id);

    if (!hasActiveChannel) {
      dispatch(setActiveChannel(generalChannel));
    }
  }, [channels, activeChannel, dispatch]);

  if (isLoadingChannels || isLoadingMessages) {
    return <LoadingSpinner />;
  }

  const channelNames = channels.map((channel) => channel.name);
  const hideModal = () => dispatch(setModalChannel({ type: null, channel: null }));
  const showModal = (type, channel = null) => dispatch(setModalChannel({ type, channel }));

  const handleActiveChannel = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <>
      <ConnectionBanner />
      <Container fluid className="chat-page h-100">
        <Row className="h-100 bg-white shadow-sm">
          <Col xs={4} className="border-end p-0 d-flex flex-column channel-sidebar">
            <ChannelHeader onAddChannel={showModal} />
            <ChannelList
              channels={channels}
              activeChannelId={activeChannel?.id}
              onActive={handleActiveChannel}
              onShowModal={showModal}
            />
          </Col>
          <Col xs={8} className="p-0 d-flex flex-column">
            <div className="d-flex flex-column h-100 p-3 chat-panel">
              <MessageHeader
                channelName={activeChannel?.name}
                messagesCount={channelMessages.length}
              />
              <MessageList messages={channelMessages} />
              <MessageInput activeChannel={activeChannel} />
            </div>
          </Col>
        </Row>
      </Container>
      {renderModal({
        modalChannel,
        hideModal,
        channelNames,
      })}
    </>
  );
};

export default HomePage;

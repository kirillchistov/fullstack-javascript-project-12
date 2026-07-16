import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelHeader from './chat/ChannelHeader.jsx';
import ChannelList from './chat/ChannelList.jsx';
import MessageHeader from './chat/MessageHeader.jsx';
import MessageInput from './chat/MessageInput.jsx';
import MessageList from './chat/MessageList.jsx';
import LoadingSpinner from './Spinner.jsx';
import { useGetChannelsQuery } from '../store/channelsApi.js';
import { useGetMessagesQuery } from '../store/messagesApi.js';
import {
  getCurrentActiveChannel,
  setActiveChannel,
} from '../store/uiSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector(getCurrentActiveChannel);
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

    const hasActiveChannel = channels.some((channel) => channel.id === activeChannel?.id);

    if (!hasActiveChannel) {
      dispatch(setActiveChannel(channels[0]));
    }
  }, [channels, activeChannel, dispatch]);

  if (isLoadingChannels || isLoadingMessages) {
    return <LoadingSpinner />;
  }

  const handleActiveChannel = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <Container fluid className="chat-page h-100">
      <Row className="h-100 bg-white shadow-sm">
        <Col xs={4} className="border-end p-0 d-flex flex-column">
          <ChannelHeader />
          <ChannelList
            channels={channels}
            activeChannelId={activeChannel?.id}
            onActive={handleActiveChannel}
          />
        </Col>
        <Col xs={8} className="p-0 d-flex flex-column">
          <div className="d-flex flex-column h-100 p-3">
            <MessageHeader
              channelName={activeChannel?.name}
              messagesCount={channelMessages.length}
            />
            <MessageList messages={channelMessages} />
            <MessageInput activeChannelId={activeChannel?.id} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

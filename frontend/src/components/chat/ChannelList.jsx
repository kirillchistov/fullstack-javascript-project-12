import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const ChannelList = ({ channels, activeChannelId, onActive }) => (
  <Nav className="flex-column nav-pills nav-fill px-2">
    {channels.map((channel) => {
      const isActive = channel.id === activeChannelId;
      const variant = isActive ? 'secondary' : 'light';

      return (
        <Nav.Item key={channel.id} className="w-100">
          <Button
            variant={variant}
            className="w-100 text-start rounded-0"
            onClick={() => onActive(channel)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </Nav.Item>
      );
    })}
  </Nav>
);

export default ChannelList;

import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';

const ChannelList = ({
  channels,
  activeChannelId,
  onActive,
  onShowModal,
}) => {
  const activeChannelRef = useRef(null);

  useEffect(() => {
    activeChannelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [channels, activeChannelId]);

  return (
    <Nav className="flex-column nav-pills nav-fill px-2 channel-list overflow-auto">
      {channels.map((channel) => {
        const isActive = channel.id === activeChannelId;
        const variant = isActive ? 'secondary' : 'light';

        return (
          <Nav.Item
            key={channel.id}
            ref={isActive ? activeChannelRef : null}
            className="w-100 mb-1"
          >
            {channel.removable ? (
              <ButtonGroup className="w-100">
                <Button
                  variant={variant}
                  className="text-start rounded-0 text-truncate channel-button"
                  onClick={() => onActive(channel)}
                >
                  {`# ${channel.name}`}
                </Button>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant={variant}
                    id={`channel-dropdown-${channel.id}`}
                  >
                    Управление
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onShowModal('renaming', channel)}>
                      Переименовать
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onShowModal('removing', channel)}>
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            ) : (
              <Button
                variant={variant}
                className="w-100 text-start rounded-0 text-truncate channel-button"
                onClick={() => onActive(channel)}
              >
                {`# ${channel.name}`}
              </Button>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default ChannelList;

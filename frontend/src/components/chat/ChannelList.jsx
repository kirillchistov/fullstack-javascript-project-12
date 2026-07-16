import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { Gear } from 'react-bootstrap-icons';

const ChannelList = ({
  channels,
  activeChannelId,
  onActive,
  onShowModal,
}) => {
  const { t } = useTranslation();
  const activeChannelRef = useRef(null);

  useEffect(() => {
    activeChannelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [channels, activeChannelId]);

  return (
    <Nav className="flex-column px-2 channel-list overflow-auto align-items-start">
      {channels.map((channel) => {
        const isActive = channel.id === activeChannelId;
        const variant = isActive ? 'secondary' : 'light';

        return (
          <Nav.Item
            key={channel.id}
            ref={isActive ? activeChannelRef : null}
            className="w-100 channel-item"
          >
            {channel.removable ? (
              <ButtonGroup className="w-100 channel-button-group">
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
                    className="channel-gear-toggle"
                    id={`channel-dropdown-${channel.id}`}
                  >
                    <Gear aria-label={t('buttons.management')} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onShowModal('renaming', channel)}>
                      {t('chat.channelList.rename')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onShowModal('removing', channel)}>
                      {t('chat.channelList.delete')}
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

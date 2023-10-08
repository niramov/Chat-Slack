import { Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { addChannel, addChannels, setCurrentChannel, removeChannel, renameChannel } from '../store/chanelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => Object.values(state.channels.entities));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const handleRemove = (id) => removeChannel(id);
  const handleRename = (id) => renameChannel(id);
  const handleAdd = addChannel();
  const channelsList = () => {
    return channels.map(({ name, id, removable }) => {
      const btnClasses = cn('btn', {
        'btn-secondary': currentChannelId === id,
      });
      const variant = currentChannelId === id ? 'secondary' : 'light';
      if (!removable) {
        return (
          <li className='nav-item w-100' key={id}>
            <button
              type='button'
              onClick={() => dispatch(setCurrentChannel(id))}
              className={`w-100 rounded-0 text-start ${btnClasses}`}
            >
              # {name}
            </button>
          </li>
        );
      }

      return (
        <li key={id}>
          <div role='group' className='d-flex dropdown btn-group'>
            <Dropdown as={ButtonGroup} className='w-100'>
              <Button
                variant={variant}
                className='text-start w-100 tet-truncate'
                onClick={() => {
                  dispatch(setCurrentChannel(id));
                }}
              >
                # {name}
              </Button>
              <Dropdown.Toggle split variant={variant} className='flex-grow-0 text-end'>
                <span className='visually-hidden'>Изменить</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleRemove(id)}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={handleRename(id)}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      );
    });
  };
  return (
    <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <Button
          /* onClick={handleAdd()} */ variant='link'
          className='p-0 text-primary btn-group-vertical text-decoration-none'
        >
          +
        </Button>
      </div>
      <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 d-block'>{channelsList()}</ul>
    </Col>
  );
};

export default Channels;

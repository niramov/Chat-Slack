import { useSelector } from 'react-redux';
import { getModalType } from '../../store/modalsSlice';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const ModalComponent = (props) => {
  const { type } = props;

  const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

  const Component = modals[type];

  return <Component {...props} />;
};

const Modal = (props) => {
  const type = useSelector(getModalType);
  return (
    <>
      {type && <ModalComponent type={type} {...props} />}
    </>
  );
};

export default Modal;

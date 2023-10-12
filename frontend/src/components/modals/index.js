import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModal = (type) => {
  return modals[type];
};

export default getModal;

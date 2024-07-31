import { IoCloseSharp } from "react-icons/io5";
import CreatePostForm from "../../pages/home/CreatePostFrom";

const CreatePostDialog = ({ onClose }) => {
  return (
    <dialog
      open
      className="modal border-none outline-none flex justify-center items-center"
    >
      <div className="modal-box rounded border border-gray-600 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoCloseSharp className="w-6 h-6" />
        </button>
        <CreatePostForm onClose={onClose} />
      </div>
    </dialog>
  );
};

export default CreatePostDialog;

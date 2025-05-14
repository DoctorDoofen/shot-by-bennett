import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const closeModal = () => setShowModal(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <button onClick={toggleModal} className="profile-button">
        <FaUserCircle className="profile-icon" />
      </button>

      <Modal isOpen={showModal} onClose={closeModal}>
        {user ? (
          <ul>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeModal}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeModal}
              modalComponent={<SignupFormModal />}
            />
          </ul>
        )}
      </Modal>
    </>
  );
}

export default ProfileButton;

import { Modal } from 'antd';

interface IDel {
  isModalVisible: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
}
const DeleteModal: React.FC<IDel> = ({
  isModalVisible,
  handleCancel,
  handleDelete,
}) => {
  return (
    <Modal
      title='Confirm Deletion'
      open={isModalVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText='Yes, Delete'
      cancelText='No, Cancel'
    >
      <p>Are you sure you want to delete this person?</p>
    </Modal>
  );
};

export default DeleteModal;

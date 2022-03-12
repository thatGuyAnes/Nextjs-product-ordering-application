import styles from '../styles/_AddProductButton.module.scss';

const AddProductButton = ({ setModalIsOpen }) => {
  return (
    <div onClick={() => setModalIsOpen(true)} className={styles.mainAddButton}>
      Add New Product
    </div>
  );
};

export default AddProductButton;

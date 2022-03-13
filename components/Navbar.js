import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/_Navbar.module.scss';


const Navbar = () => {

  const menuRef = useRef(null);
  const quantity = useSelector(state => state.shopcart.quantity);

  const toggleMenu = (e) => {
    e.target.classList.toggle(`${styles['open']}`);
    menuRef.current.classList.toggle(`${styles['open']}`);
  };
  return (
    <div className={styles.container}>

      <Link href="/" passHref>
        <div className={styles.item}>
          <div className={styles.texts}>HOME</div>
        </div>
      </Link>

      <div className={`${styles.item} ${styles.left}`}>
        <Link href="/admin" passHref>
          <button className={styles.admin}>Admin Dashboard</button>
        </Link>

        <Link href="/shopcart" passHref>
          <div className={styles.cart}>
            <Image src="/images/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>



      </div>

    </div>
  );
};

export default Navbar;

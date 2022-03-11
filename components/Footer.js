import Image from 'next/image';
import styles from '../styles/_Footer.module.scss';

const Footer = () => {
  return (

    <div className={styles.container}>

      <div className={`${styles.map} ${styles.item}`}>
        <Image src="/images/map-dark.jpg" objectFit="cover" layout="fill" alt="" />

        <div className={`${ styles['map-info'] }`}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 11:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>

      </div>

      <div className={styles.item}>

        <div className={styles.card}>
          <h2 className={styles.motto}>
                    Motto
          </h2>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Locations</h1>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Socials</h1>
        </div>

      </div>
    </div>
  );
};

export default Footer;

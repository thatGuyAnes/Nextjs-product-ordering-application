import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/_Product_Card.module.scss';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.container}>

      <Link href={`/product/${product._id}`} passHref>
        <Image src={product.image} alt="" width="500" height="500" />
      </Link>

      <hr/>
      <span className={styles.infos}>

        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${product.prices[0]}</span>

        <p className={styles.desc}>
          {product.description}
        </p>

      </span>

    </div>

  );
};

export default ProductCard;

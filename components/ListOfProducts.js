import styles from '../styles/_ListOfProducts.module.scss';
import ProductCard from './Product_Card';

const ListOfProducts = ({products}) => {
  // const handleArrow = (direction) =>{
  //   if(direction==='l'){
  //     setIndex(index !== 0 ? index-1 : 2);
  //   }
  //   if(direction==='r'){
  //     setIndex(index !== 2 ? index+1 : 0);
  //   }
  // };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST AT YOUR FINGER TIPS</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {
          products.map((product) =>
            <ProductCard key={product._id} product={product} />
          )
        }
      </div>


    </div>
  );
};

export default ListOfProducts;

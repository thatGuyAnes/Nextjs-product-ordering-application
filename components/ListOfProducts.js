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
      <h1 className={styles.title}>Our Products</h1>

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

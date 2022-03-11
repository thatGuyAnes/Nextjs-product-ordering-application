import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import styles from '../../styles/_Product.module.scss';
import { add } from '../../redux/shopcartSlice';

const Product = ({data}) => {
  const product = data.data;
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const updatePrice = (addition) => {
    setPrice(price + addition);
  };

  const onOptionChange = (e, option) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      updatePrice(option.price);
      setOptions([...options, option]);
    } else {
      updatePrice(-option.price);
      setOptions(options.filter(opt => opt._id !== option._id ));
    }
  };

  const onSizeChange = (e) => {
    const diff = product.prices[+e.target.value] - product.prices[size];
    setSize(+e.target.value);
    updatePrice(diff);
  };

  const onAddToCartClick = () => {
    dispatch(add({...product, price, quantity, options}));
  };


  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.image} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>{price}</span>
        <p className={styles.desc}>{product.description}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>


          <select name="cars" id="size" onChange={onSizeChange}>
            <option value="0">Small</option>
            <option value="1">Medium</option>
            <option value="2">Large</option>
          </select>

        </div>
        <h3 className={styles.choose}>Choose additional options</h3>
        <div className={styles.options}>

          {product.options.map((option) =>
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id="one"
                name="one"
                className={styles.checkbox}
                onChange={(e) => onOptionChange(e, option)}
              />
              <label htmlFor="one">{option.text}</label>
            </div>
          )}

        </div>

        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            min={0}
            className={styles.quantity}
            onChange={e => setQuantity(e.target.value)}
          />
          {/* dispatch to addProduct */}
          <button className={styles.button} onClick={onAddToCartClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({params}) {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      data: res.data,
    }
  };
};

export default Product;




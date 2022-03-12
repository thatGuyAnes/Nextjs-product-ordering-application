import styles from '../styles/_ShopCart.module.scss';
import { reset } from '../redux/shopcartSlice';
import Image from 'next/image';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const ShopingCart = () => {

  const dispatcher = useDispatch();
  const shopcart = useSelector(state=> state.shopcart);
  const router = useRouter();

  // This values are the props in the UI
  const amount = shopcart.total;
  const currency = 'USD';
  const style = {'layout':'vertical'};


  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);
      if (res.status === 201) {
        dispatcher(reset());
        router.push(`/orders/${res.data.data._id}`);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (<>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
            // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Your code here after capture the order
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              name: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: shopcart.total,
              paymentMethod: 1,
            });
          });
        }}
      />
    </>
    );
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product Image</th>
              <th>Name</th>
              <th>Options</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {shopcart.products.map((product) =>
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.image}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.options}>
                    {product.options.map(option =>(
                      <span key={option._id}>{option.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.quantity * product.price}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>

        <div className={styles.wrapper}>

          <h2 className={styles.title}>CART TOTAL</h2>

          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>{shopcart.total}
          </div>

          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>

          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$79.60
          </div>

          <PayPalScriptProvider
            options={{
              'client-id': 'ATsxxtG6SQzMAeXPntAljRJS7tTYmSyp68SiJkGd2onc2wBjI9pGxbCaCSDD3UHv8OlH3WP2BjkAHyo-',
              components: 'buttons',
              currency: 'USD',
              'disable-funding': 'credit,card,p24',
            }}
          >
            <ButtonWrapper
              currency={currency}
              showSpinner={false}
            />
          </PayPalScriptProvider>
        </div>

      </div>





    </div>
  );
};

export default ShopingCart;



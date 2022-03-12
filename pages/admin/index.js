import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/_Admin.module.scss';

const Admin = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);

  const status = ['preparing', 'delivering', 'delivered'];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        'http://localhost:3000/api/products/' + id
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>

          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Name</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>

          {orderList.map((order) => (

            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.name}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>

          ))}

        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {

  const adminCookie = ctx.req?.cookies || '';
  // if no cookie on the req, redirect to login page
  if (adminCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const res_products = await axios.get('http://localhost:3000/api/products');
  const res_orders = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      orders: res_orders.data.data,
      products: res_products.data.data,
    },
  };
};

export default Admin;

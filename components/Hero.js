import styles from '../styles/_Hero.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const Hero = () => {
  const [index, setIndex] = useState(0);
  const images = [
    '/images/featured.png',
    '/images/featured2.png',
    '/images/featured3.png',
  ];

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

      <div className={styles.header}>
        <h1>The best at your service</h1>
        <p>Unbelievably great pizza and drinks<br/>located at Palermo</p>
        <button type="button" className={styles.cta}>Order Online</button>
      </div>

      {/*       <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow('l')}> */}
      {/*         <Image src="/images/arrowl.png" alt="" layout="fill" objectFit="contain"/> */}
      {/*       </div> */}
      {/*       <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}> */}
      {/*         {images.map((img, i) => ( */}
      {/*           <div className={styles.imgContainer} key={i}> */}
      {/*             <Image src={img} alt="" layout="fill" objectFit="contain" /> */}
      {/*           </div> */}
      {/*         ))} */}
      {/*       </div> */}
      {/*       <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow('r')}> */}
      {/*         <Image src="/images/arrowr.png" layout="fill" alt="" objectFit="contain"/> */}
      {/*       </div> */}
      {/*  */}
    </div>
  );
};

export default Hero;

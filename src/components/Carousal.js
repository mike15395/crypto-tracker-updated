/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react'
import { CoinList } from '../API'
import { GetCryptoValues } from '../CryptoContext'
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';


function Carousal() {
    const { currency,symbol } = GetCryptoValues();
    const [coin, setCoin] = useState([]);

    const getData = async() => {
        const {data} = await axios.get(CoinList(currency));
        console.log(data);
        setCoin(data);
    }
  
     useEffect(() => {
         getData();
     }, [currency])
     

    const useStyles = makeStyles({
        carousal: {
            display: 'flex',
            justifyContent: 'space-evenly'
        },
        carousalItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center'
            
        },
        carousalContainer: {
            width: '70vw',
            height: '50vh',
            marginLeft: '200px',
            marginTop:'30px'
            
        }
    })
    
    const classes = useStyles();
    const items = coin.map((item, index) => {
        let profit = item.price_change_percentage_24h;

        return (
            <Link to={`/coins/${item.id}`} className='text-decoration-none text-white'>
            <div className={classes.carousalItem} key={index}>
                  
                <img src={item?.image} style={{width:'100px',height:'100px'}} alt='' />
                <p style={{textTranform:'uppercase',fontSize:'20px',fontWeight:'bold'}}>{item?.symbol}</p>
                <p style={{color: profit>0 ? 'green':'red' }}>{item?.price_change_percentage_24h.toFixed(2)}%</p>
                <p>{symbol} {" "} {item?.current_price} </p>
                </div>
            </Link>

        )
    });

    const responsive = {
        0: {
            items:2,
        },
        512: {
            items:4,
        }
    }
    
    return (
      <div className={classes.carousalContainer}>
        <div className={classes.carousal}>
           

          <AliceCarousel
           
              mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableButtonsControls
              disableDotsControls
              responsive={responsive}
              items={items}
            autoPlay
          
          />
          
            </div>
        </div>
  )
}

export default Carousal;
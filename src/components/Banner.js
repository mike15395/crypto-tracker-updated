import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousal from './Carousal';

const useStyles = makeStyles({
    banner: {
        backgroundImage: 'url(./banner2.jpg)'
        
    },
    tagline: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    bannerContent: {
        height: '350px'
    }
})

function Banner() {
    const classes = useStyles();
  return (
      <div className={classes.banner}>
          <div className={classes.bannerContent}>
              <div className={classes.tagline}>
                    <Typography variant='h3'>
                        Crypto Tracker
                  </Typography>
                  <Typography variant='e2'>
                      Get All the Info Regarding Your Favourite Crypto Currency
                  </Typography>
              </div>
              <Carousal/>
              
          </div>
      </div>
  )
}

export default Banner
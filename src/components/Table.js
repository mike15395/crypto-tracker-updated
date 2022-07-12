/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
//import { TextField } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
//import CustomizedTables from './CustomizedTables';
import axios from 'axios';
import { CoinList } from '../API';
import { GetCryptoValues } from '../CryptoContext';
import { useEffect, useState } from 'react';
//import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from '@material-table/core';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: 'white',
    width: '70vw',
    marginLeft: '15vw',
    marginTop: '10vh',
    }
})




function Table() {
  const classes = useStyles();
  const [tableData, setTable] = useState([]);

  //const [search, setSearch] = useState('');

  const { currency } = GetCryptoValues();
  useEffect(() => {
  getTableData();
}, [currency])
const getTableData= async() => {
  const {data} = await axios.get(CoinList(currency));
  console.log(data);
  setTable(data);
}

  const navigate = useNavigate();
  function handleClick(id) {
    console.log(id);
    navigate(`/coins/${id}`);
  }

  // let sym = tableData.symbol;
  // console.log(sym.toUpperCase());


  return (
      <div>
          <div className={classes.tableContainer}>
        {/* <h1>Cryptocurrency Prices By Market Cap</h1><br /> */}
        {/* <ThemeProvider theme={darkTheme}>
          <TextField color='secondary' style={{ backgroundColor: 'transparent', width: '60%' }}
            id="outlined-basic" label="Search for a Crypto Currency"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ThemeProvider><br /> */}
        {/* <CustomizedTables tableData={tableData} setTable={setTable} symbol={symbol} search={search} /> */}



        <MaterialTable
          columns={[
            { title: '', field: 'image', render: item => <img src={item.image} height='50px' width='50px' alt="crypto_image" /> },
            { title: 'Symbol', field: 'symbol' },
            { title: 'Coin', field: 'name' },
            { title: 'Price', field: 'current_price' },
            { title: '24h Change', field: 'price_change_percentage_24h', type: 'numeric' },
            { title: 'Market Cap', field: 'market_cap' }
          ]}
          data={tableData}
          title="Cryptocurrency Prices By Market Cap"
          onRowClick={(event, rowData) => handleClick(rowData.tableData.id)}

          options={{
            headerStyle: {
              backgroundColor: 'gold',
              color: 'black',
              fontSize: '16px'
            },

          }}

        />
      </div>

    </div>

  )
}

export default Table
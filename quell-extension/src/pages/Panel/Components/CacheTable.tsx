import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const CacheTable = () => {
  //use state to store data from redis server
  const [ redisData, setRedisData ] = useState({});

  const handleClickUpdate = () => {

    //send fetch to redis route
    fetch('http://localhost:3000/redis')
      .then(response => console.log(response))
      .catch(error => console.log('error fetching from redis', error));
  }
  //  fetch returns object of key value pairs
  //  access properties of object 
  //function to create an object with key value pairs,
  //input is name, 
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="metrics table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Redis Cache Metrics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>


      </Table>
      </TableContainer>
      <Button id="update-cache-btn"onClick={handleClickUpdate}>Update</Button>
    </>
  )
}

export default CacheTable

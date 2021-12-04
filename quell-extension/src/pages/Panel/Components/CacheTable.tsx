import React, { useState, useEffect } from 'react';

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
  const tableData = React.useMemo(() => {}, [])


  return (
    <>
      
      <button id="update-cache-btn"onClick={handleClickUpdate}>Update</button>
    </>
  )
}

export default CacheTable

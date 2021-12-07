import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';

const CacheTable = () => {
  //use state to store data from redis server
  const [ redisStats, setRedisStats ] = useState([]);

  useEffect(() => {
    //  send fetch to redis route
     fetch('http://localhost:3000/redis')
     .then(response => response.json())
     .then(data => setRedisStats(data))
     .catch(error => console.log('error fetching from redis', error));
  },[])

  console.log('this is redis stats', redisStats);
  
  const columns = useMemo(() => [
    {
      id: 'server',
      Header: 'Server',
      accessor: row => redisStats.server
      // columns: [{id: 'server-name', accessor: row => row.server[0].name}, {id: 'server-value', accessor: row => row.server[0].value }]
    },
    {
    id: 'client-col',
    Header: 'Client',
    accessor: row => redisStats.client
    // columns: [{},{}]
  },
  {
    id: 'mem-col',
    Header: 'Memory',
    accessor: row => redisStats.memory
    // columns: [{},{}]
  },
  {
    id: 'stat-col',
    Header: 'Statistics',
    accessor: row => redisStats.stats
    // columns: [{},{}]
  }
  ], [])


  const data = useMemo(
    () => [...redisStats], []);
  console.log(data);
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })
  
  return (
    <>
    <p>Redis Database</p>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
   </>

  )
}
export default CacheTable

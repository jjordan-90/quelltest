import React, { useState, useEffect } from 'react';
import Trend from 'react-trend';

const Metrics = (props) => {
  const { 
    fetchTime, // time to fetch request
    cacheStatus, // whether query is added to cache
    cacheClearStatus, // whether cache is cleared
    fetchTimeInt, // array of time values at each point in fetching and caching
   } = props;
  const avgFetchTime = fetchTimeInt[0] ? (fetchTimeInt.reduce((a:number, b:number) => a+b, 0)/fetchTimeInt.length).toFixed(2) + " ms": " - ms";

  return (
    <div id="metrics-container">
      <h3>Metrics:</h3>
      <div id="speed-metrics">
        <div>Latest query/mutation time:</div>
        <div style={{fontSize:'2em'}}>{fetchTime ? fetchTime + " ms" :" - ms"}</div>
        <div>Average cache time: {avgFetchTime}</div>
      </div>
      <div id="speed-graph">
        <h3>Speed Graph:</h3>
        <Trend
          height = {200}
          className="trend"
          data={fetchTimeInt}
          gradient={['#1feaea','#ffd200', '#f72047']}
          radius={0.9}
          strokeWidth={5.2}
          strokeLinecap={'round'}
        />
      </div>
    </div>
  );
};

export default Metrics;
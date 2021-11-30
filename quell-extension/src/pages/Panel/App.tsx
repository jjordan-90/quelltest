import React, { useState, useEffect, useRef } from 'react';
// Components for extension
import Client from './Input/Client';
import Output from './Output/Output';
import Server from './Input/Server';
import Metrics from './Metrics/Metrics';
import Management from './Management/Management';
import Editor from './Input/Editor';
import styles from './App.scss';
// Material UI
import Button from '@mui/material/Button';
// GraphQL
import { getIntrospectionQuery, buildClientSchema } from 'graphql';

const App = () => {
  // saving state to see if operating on client side or server side
  // 'true' for client-side and 'false' for server-side...
  const [dataOrigin, setOrigin] = useState(true);
  // queried data results
  const [results, setResults] = useState({});
  const [schema, setSchema] = useState({});
  const [queryString, setQueryString] = useState('');
  const [graphQLRoute, setGraphQLRoute] = useState('/graphQL');
  const [clientAddress, setClientAddress] = useState('http://localhost:8080')
  const [serverAddress, setServerAddress] = useState('http://localhost:3000')
  const [queryResponseTime, setQueryResponseTime] = useState<number[]>([]);

  const logNewTime = (recordedTime:number) => {
    setQueryResponseTime(queryResponseTime.concat(Number(recordedTime.toFixed(2))));
  }

  useEffect(() => {
    const introspectionQuery = getIntrospectionQuery();
    const address = `${serverAddress}${graphQLRoute}`;
    fetch(address, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              query: introspectionQuery,
              operationName: 'IntrospectionQuery',
              variables: null
            })
    })
      .then(response => response.json())
      .then(data => {
        const schema = buildClientSchema(data.data)
        console.log(schema)
        setSchema(schema);
      })
      .catch(err => console.log(err));
  }, [clientAddress, serverAddress, graphQLRoute])

  return (
    <div className="panel">
      <Button mode="dark" id="client-side" onClick={() => setOrigin(true)}>
        Client
      </Button>
      <Button mode="dark" id="server-side" onClick={() => setOrigin(false)}>
        Server
      </Button>
      <div className="main_container">
        <div className="query_input segmented_wrapper">
          <div>Queries</div>
          <div>
            <Editor
              logNewTime={logNewTime}
              clientAddress={clientAddress}
              serverAddress={serverAddress}
              graphQLRoute={graphQLRoute}
              setGraphQLRoute={setGraphQLRoute}
              queryString={queryString}
              setQueryString={setQueryString}
              setResults={setResults}
              schema={schema}
            />
          </div>
          {/* {dataOrigin ? <Client /> : <Server />} */}
          <Management />
        </div>
        <div className="query_output segmented_wrapper">
          <div>Queried Results</div>
          <Output results={results} />
        </div>
        <div className="query_stats segmented_wrapper">
          <Metrics fetchTime={queryResponseTime[queryResponseTime.length-1]} cacheStatus={'Yes'} cacheClearStatus={'No'} fetchTimeInt = {queryResponseTime} />
        </div>
      </div>
    </div>
  );
};

export default App;

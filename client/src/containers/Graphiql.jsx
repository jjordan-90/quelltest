import React, { useState, useEffect } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { Quellify, lokiClientCache } from '../../../quell/quell-client/src/Quellify';
import { getCounters } from '../../../quell/quell-client/src/helpers/normalizeForLokiCache';
import { data } from 'browserslist';


const Graphiql = () => {
  const [writeCount, setWriteCount] = useState(0);

  const fetcher = createGraphiQLFetcher({
    url: '/graphql',
  });

  const debugFetcher = async (graphQLParams) => {
    const results = await fetcher(graphQLParams);
    console.log({results});
    return results;
  }

  const mutationMap = {
    addPerson: 'Person'
  };

  const map = {
    person: 'Person',
    people: 'Person'
  };

  const queryTypeMap = {
    person: 'Person',
    people: 'Person'
  };

  const qfetcher = async (graphQLParams) => {
    console.log(graphQLParams);
    const results = await Quellify(
      '/graphql',
      graphQLParams.query,
      mutationMap,
      map,
      queryTypeMap
    )

    return results;
  };

  const getWC = () => {
    setWriteCount(lokiClientCache.count());
  };

  return (
    <div className="graphiql">
      <GraphiQL fetcher={qfetcher} />
      <button style={{visibility:'hidden'}} id="writeCount" value={writeCount} onClick={() => getWC()}> {writeCount}</button>
    </div>
  );
};

export default Graphiql;

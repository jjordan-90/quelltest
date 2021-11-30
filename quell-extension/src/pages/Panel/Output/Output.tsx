import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import beautify from 'json-beautify';

const Output = ({results}) => {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (Object.keys(results).length > 0) {
      console.log(results);
      setOutput(beautify(results, null, 2, 80));
    }
  }, [results])


  return(
    <CodeMirror
      value={output}
      height='auto'
      options={{
        theme: 'material',
        lineNumbers: false,
        mode:'json'
      }}  
      // onBeforeChange={(editor, data, value) => {
      //   console.log(value);
      // }}

    />
  );
};

export default Output;
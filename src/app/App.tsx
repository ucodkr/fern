/* eslint-disable @typescript-eslint/no-explicit-any */

import './App.css'
import { BlockEditor } from '../components/BlockEditor'
import './preflight.css'
import { useState } from 'react'

function App () {
  const [content, setContent] = useState();

  return <>

    <BlockEditor className='border rounded-sm p-2 h-1/2'
      onChange={(editor: any) => {

        setContent(editor.getJSON());

      }}
    ></BlockEditor>
    <div className='h-1/2  overflow-auto'>
      <pre className='text-sm  '> {JSON.stringify(content || "{}", null, 2)} </pre>
    </div>
  </>
}

export default App

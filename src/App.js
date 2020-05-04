import React, { useState } from 'react'
import { useEffectAsync } from '@availity/hooks'
import { API, graphqlOperation } from 'aws-amplify'
import { allItem } from './graphql/queries'
import { addItem } from './graphql/mutations'

const App = () => {
  const [item, setItem] = useState([{
    id: '',
    data: '',
  }])
  const [inputItem, setInputItem] = useState({
    data: '',
  })
  useEffectAsync(async () => {
    const result = await API.graphql(graphqlOperation(allItem))
    setItem(result.data.allItem)
  })

  return (
    <div>
      <input value={inputItem.data} onChange={(e) => setInputItem({ data: e.target.value})} />
      <button onClick={
        async () => await API.graphql(graphqlOperation(addItem, { item: inputItem }))
      }>
        add
      </button>
      <ul>
        {item.map(i =>
          <li>
            {i.data}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App

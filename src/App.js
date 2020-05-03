import React, { useState } from 'react'
import { useEffectAsync } from '@availity/hooks'
import { API, graphqlOperation } from 'aws-amplify'
import { allItem } from './graphql/queries'

const App = () => {
  const [item, setItem] = useState([{
    id: '',
    data: '',
  }])
  useEffectAsync(async () => {
    const result = await API.graphql(graphqlOperation(allItem))
    setItem(result.data.allItem)
  })
  return (
    <ul>
      {item.map(i =>
        <li>
          {i.data}
        </li>
      )}
    </ul>
  )
}

export default App

import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function useApi(api) {
  const [results, setResults] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(results => {
      if (!isCurrent) return
      setResults(results)
    })
    return () => (isCurrent = false)
  }, [api])

  return results
}

function ProductProfile({ productId }) {
  const getProduct = useCallback(() => api.product.getProduct(productId), [productId])
  const product = useApi(getProduct)

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

ReactDOM.render(<ProductProfile productId={1} />, document.getElementById('root'))

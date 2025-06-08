import React, { useEffect } from 'react'
import "./Success.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Success = () => {

  const {search} = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const payment_intent = params.get("payment_intent")

  useEffect(()=> {
    const makeRequest = async ()=> {
      try {
        await newRequest.post("/orders/confirm-payment", { payment_intent });


        setTimeout(()=> {
          navigate("/orders")
        },5000)
      } catch (error) {
        console.log(error)
      }
    }
    makeRequest()
  })
  return (
    <div className='success'>
      <p>Payment successful .You being redirected to orders page. Please do not close the page.</p>
    </div>
  )
}

export default Success

import React, { useState, useEffect } from 'react'

const Timer = ({ time }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    setTime(time)
  })
}

export default Timer

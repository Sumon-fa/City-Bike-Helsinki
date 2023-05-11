import React, { useEffect, useState } from 'react'
import Import from '../../../Ui/Import'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { importJourney } from '../../../../redux/methods/journeyMethods'

const ImportJorney = () => {
  const [item, setItem] = useState<File | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const data = { file: item }
    if (item) {
      dispatch(importJourney(data))
    }
    setItem(null)
  }, [item])

  return <Import setItem={setItem} />
}

export default ImportJorney

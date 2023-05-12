import React, { useEffect, useState } from 'react'
import Import from '../../../Ui/Import'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { importJourney } from '../../../../redux/methods/journeyMethods'

const ImportJorney = () => {
  const [item, setItem] = useState<File | null>(null)
  const dispatch = useAppDispatch()
  const { isError, isLoading, importJourneytResponse } = useAppSelector((state) => state.journey)

  useEffect(() => {
    const data = { file: item }
    if (item) {
      dispatch(importJourney(data))
    }
    setItem(null)
  }, [item])

  return (
    <Import
      setItem={setItem}
      isError={isError}
      isLoading={isLoading}
      importResponse={importJourneytResponse}
    />
  )
}

export default ImportJorney

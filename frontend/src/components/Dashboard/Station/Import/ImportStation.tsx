import React, { useEffect, useState } from 'react'
import Import from '../../../Ui/Import'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { importStation } from '../../../../redux/methods/stationMethods'

const ImportStation = () => {
  const [item, setItem] = useState<File | null>(null)
  const dispatch = useAppDispatch()

  const { isError, isLoading } = useAppSelector((state) => state.station)

  useEffect(() => {
    const data = { file: item }
    if (item) {
      dispatch(importStation(data))
    }
    setItem(null)
  }, [item])

  return <Import setItem={setItem} isError={isError} isLoading={isLoading} />
}

export default ImportStation

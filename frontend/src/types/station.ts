export interface Station {
  fid: number | null
  id: string
  nimi: string
  osoite: string
  kaupunki: string
  x: number
  y: number
}

export interface GetAllStations {
  result: Station[]
  totalItems: number
}

export interface StationState {
  stations: Station[]
  totalStations: number
  station: Station
  isLoading: boolean
  isError: any
}

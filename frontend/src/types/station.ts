export interface CreateStation {
  id: string
  nimi: string
  namn: string
  name: string
  osoite: string
  adress: string
  kaupunki: string
  stad: string
  operaattor: string
  kapasiteet: number
  x: number
  y: number
}

export interface NewStation extends CreateStation {
  fid: number
}

export interface Station {
  fid: number
  id: string
  nimi: string
  osoite: string
  kaupunki: string
  kapasiteet: string
  x: number
  y: number
}

export interface StationDetails {
  name: string
  address: string
  numOfStartingJourney: number
  numOfEndingJourney: number
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
  stationDetails: StationDetails | null
  isLoading: boolean
  isError: any
  createdStation: NewStation | null
  isSuccess: boolean
}

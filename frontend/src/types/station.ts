export interface Station {
  fid: number | null
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

export interface ImportStationResponse {
  successMessage: string
  deletedData: string
}

export interface FileData {
  file: File | null
}

export interface StationState {
  stations: Station[]
  totalStations: number
  station: StationDetails | null
  isLoading: boolean
  isError: any
  importStationtResponse: ImportStationResponse | null
}

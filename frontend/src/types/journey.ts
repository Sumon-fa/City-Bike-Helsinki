export interface Journey {
  id: string
  departure: string
  departureStationId: string
  departureStationName: string
  return: string
  returnStationId: string
  returnStationName: string
  coveredDistance: number
  duration: number
}

export interface GetAllJourneys {
  result: Journey[]
  totalItems: number
}

export interface JourneyState {
  journeys: Journey[]
  totalJourneys: number
  journey: Journey
  isLoading: boolean
  isError: any
}

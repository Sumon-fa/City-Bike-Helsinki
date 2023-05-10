export interface CreateJourney {
  departure: string
  departureStationId: string
  departureStationName: string
  return: string
  returnStationId: string
  returnStationName: string
  coveredDistance: number
  duration: number
}

export interface Journey extends CreateJourney {
  id: string
}

export interface GetAllJourneys {
  result: Journey[]
  totalItems: number
}

export interface JourneyState {
  journeys: Journey[]
  totalJourneys: number
  journey: Journey | null
  isLoading: boolean
  isError: any
}

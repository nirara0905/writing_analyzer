export interface AnalysisResult {
  id: string
  text: string
  result: string
  createdAt: string
}

export interface AnalysisState {
  isLoading: boolean
  error: string | null
  result: string | null
}

export type Analysis = {
  id: number
  folderId: number
  folderName: string
  status: string
  summary?: string
  strength?: string
  suggestion?: string
  keyword?: string
  recKeyword?: string
  inputToken?: number
  outputToken?: number
  createdAt: string
  completedAt: string
}

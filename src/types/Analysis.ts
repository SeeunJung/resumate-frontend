export type Analysis = {
  id: number
  folderId: number
  folderName: string
  parentFolderId?: number
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

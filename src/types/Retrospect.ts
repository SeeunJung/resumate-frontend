export type Retrospect = {
  id?: number
  folderId: number
  folderName?: string
  title: string
  description?: string
  positives: string
  improvements: string
  learnings: string
  aspirations: string
  reviewDate: string
  isCompleted: boolean
}

export type DraftRetrospect = {
  id: number
  folderId: number
  parentFolderId?: number
  folderName: string
  title: string
  description?: string
  reviewDate?: string
  positives?: string
  improvements?: string
  learnings?: string
  aspirations?: string
  isCompleted: boolean
}

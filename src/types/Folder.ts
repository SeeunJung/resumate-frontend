export type Folder = {
  id?: number
  parentId?: number | null
  parentName?: string | null
  name?: string
  order?: number
  modifiedAt?: string
  children?: Folder[]
}

export type ThemeColor = {
  bg: string
  text: string
  border: string
}

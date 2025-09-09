// import type { Folder, FolderNode } from '../types/Folder'

// export function buildFolderTree(folders: Folder[]): FolderNode[] {
//   const activeFolders = folders.filter((folder) => !folder.is)
//   const folderMap = new Map<string, FolderNode>()
//   activeFolders.forEach((folder) => {
//     folderMap.set(folder.id.toString(), { ...folder, children: [] })
//   })
//   const roots: FolderNode[] = []

//   folderMap.forEach((folder) => {
//     if (folder.parent_id) {
//       const parent = folderMap.get(folder.parent_id.toString())
//       if (parent) {
//         parent.children.push(folder)
//       } else {
//         roots.push(folder)
//       }
//     } else {
//       roots.push(folder)
//     }
//   })

//   const sortFolder = (nodes: FolderNode[]) => {
//     nodes.sort((a, b) => a.order - b.order)
//     nodes.forEach((n) => sortFolder(n.children))
//   }
//   sortFolder(roots)

//   return roots
// }

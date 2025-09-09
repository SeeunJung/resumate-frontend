import type { Folder } from '@/types/Folder'
import FolderTreeNode from './FolderTreeNode'

function FolderTree({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex flex-col gap-1">
      {folders.map((node) => (
        <FolderTreeNode
          key={node.id}
          node={node}
        />
      ))}
    </div>
  )
}

export default FolderTree

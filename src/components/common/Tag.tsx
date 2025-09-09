import { useFolderColorStore } from '@/stores/useFolderColorStore'

function Tag({
  folderId,
  folderName,
}: {
  folderId: number
  folderName: string
}) {
  const getColor = useFolderColorStore((state) => state.getColor)
  const color = getColor(folderId)

  return (
    <div
      className={`h-4 px-3 py-3 ${color.bg} rounded-lg border ${color.border} inline-flex justify-center items-center`}
    >
      <span
        className={`px-1 py-1 rounded-sm text-xs font-semibold ${color.bg} ${color.text}`}
      >
        {folderName}
      </span>
    </div>
  )
}

export default Tag

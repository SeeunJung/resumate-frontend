import { useState } from 'react'
import type { Folder, ThemeColor } from '../../../types/Folder'
import PreviewCardGrid from './PreviewCardGrid'

interface RetrospectiveWrapperProps {
  folder: Folder
  color: ThemeColor
  selectedFolders: number[]
  toggleFolderSelection: (id: number) => void
}

function RetrospectiveWrapper({
  folder,
  color,
  selectedFolders = [],
  toggleFolderSelection,
}: RetrospectiveWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isChecked = selectedFolders.includes(folder.id!)

  return (
    <div className={`flex flex-col p-3 rounded-xl ${color.bg}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isChecked}
            onChange={(e) => {
              e.stopPropagation()
              toggleFolderSelection(folder.id!)
            }}
          />
          <span className={`text-sm font-bold ${color.text}`}>
            {folder.name}
          </span>
        </div>
        <span
          className="items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
            >
              <path
                d="M1 7.5L7 1.5L13 7.5"
                stroke="#0F6C62"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M17.2931 8.79314C17.6837 8.40261 18.3167 8.40261 18.7072 8.79314C19.0976 9.18367 19.0977 9.8167 18.7072 10.2072L12.7072 16.2072C12.3167 16.5977 11.6837 16.5976 11.2931 16.2072L5.29314 10.2072C4.90261 9.81668 4.90261 9.18366 5.29314 8.79314C5.68366 8.40261 6.31668 8.40261 6.7072 8.79314L12.0002 14.0861L17.2931 8.79314Z"
                fill="#0F6C62"
              />
            </svg>
          )}
        </span>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen mt-3' : 'max-h-0'
        }`}
      >
        <PreviewCardGrid folderId={folder.id!} />
      </div>
    </div>
  )
}

export default RetrospectiveWrapper

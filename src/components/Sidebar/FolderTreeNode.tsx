import { Link } from 'react-router-dom'
import type { Folder } from '../../types/Folder'
import { FolderDropDown } from '../common/DropDown'
interface FolderNodeProps {
  node: Folder
}

function FolderTreeNode({ node }: FolderNodeProps) {
  return (
    <div className="m-2 px-2 flex justify-between items-center rounded-md hover:bg-[var(--brand--blue--subtler)]">
      <Link
        to={`/retrospects/${node.id}`}
        className="flex justify-between items-center px-2 py-1 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="flex w-5 h-5 items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3291 3.98633C10.5456 3.98592 10.7533 4.07332 10.9043 4.22852L12.3359 5.7002H20.1992C21.1933 5.70025 21.999 6.5069 21.999 7.50098V18.2002C21.9988 19.1941 21.1931 20.0009 20.1992 20.001H3.79785C2.80407 20.001 1.9976 19.1949 1.99707 18.2012L1.99609 5.79883C1.99599 4.80596 2.8001 4.00089 3.79297 3.99902L10.3291 3.98633ZM3.7959 5.59863C3.68558 5.59884 3.59569 5.68851 3.5957 5.79883L3.59766 18.2012C3.59818 18.3112 3.68772 18.4004 3.79785 18.4004H20.1992C20.3095 18.4003 20.3992 18.3104 20.3994 18.2002V7.50098C20.3994 7.39056 20.3096 7.30084 20.1992 7.30078H11.9971C11.7813 7.30065 11.5743 7.21319 11.4238 7.0586L9.99316 5.58692L3.7959 5.59863Z"
                fill="#3E3E3E"
              />
            </svg>
          </span>
          <span className="text-sm font-medium truncate leading-none">
            {node.name}
          </span>
        </div>
      </Link>

      <FolderDropDown node={node} />
    </div>
  )
}

export default FolderTreeNode

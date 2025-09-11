import { useAuthStore } from '@/stores/useAuthStore'
import { UserDropDown } from '../common/DropDown'

function UserSection() {
  const { user } = useAuthStore()
  return (
    <div className="flex justify-between items-center w-full p-3">
      <div className="flex items-center gap-2">
        {/* 추후 이미지 대체 예정 */}
        <button className="flex items-center justify-center  w-8 h-8 rounded-full bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="w-4 h-4"
          >
            <path
              d="M5.52441 17.8096C12.0723 13.5219 20.5696 13.6467 26.9893 18.124C27.6217 18.5652 27.9989 19.2874 27.999 20.0586V25.5996C27.999 26.9251 26.9241 28 25.5986 28H6.40039C5.07491 28 4 26.9251 4 25.5996V20.1055C4 19.2961 4.40798 18.5411 5.08496 18.0977L5.52441 17.8096ZM25.7686 19.873C20.0634 15.8943 12.5124 15.7844 6.69336 19.5947L6.25391 19.8818C6.17866 19.9311 6.13379 20.0155 6.13379 20.1055V25.5996C6.13379 25.7469 6.25311 25.8662 6.40039 25.8662H25.5986C25.7459 25.8662 25.8652 25.7469 25.8652 25.5996V20.0586C25.8651 19.9848 25.8291 19.9153 25.7686 19.873ZM16 2.66699C18.9455 2.66699 21.333 5.05448 21.333 8C21.333 10.9455 18.9455 13.333 16 13.333C13.0545 13.333 10.667 10.9455 10.667 8C10.667 5.05448 13.0545 2.66699 16 2.66699ZM16 4.7998C14.2327 4.7998 12.7998 6.23269 12.7998 8C12.7998 9.76731 14.2327 11.2002 16 11.2002C17.7673 11.2002 19.2002 9.76731 19.2002 8C19.2002 6.23269 17.7673 4.7998 16 4.7998Z"
              fill="white"
            />
          </svg>
        </button>
        <span className="text-sm font-medium">{user.nickname || '사용자'}</span>
      </div>

      <UserDropDown />
    </div>
  )
}

export default UserSection

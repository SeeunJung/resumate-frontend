import { deleteRetrospect } from '@/services/retrospect'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom'

interface RetrospectDetailHeaderProps {
  retroId: number
  onEdit: () => void
  openModal: (modalProps: {
    isError: boolean
    title: string
    description: string
    onBtnClick?: () => void
  }) => void
}

function DetailHeaderButtons({
  retroId,
  onEdit,
  openModal,
}: RetrospectDetailHeaderProps) {
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      await deleteRetrospect(retroId)
      openModal({
        isError: false,
        title: '회고 삭제 성공',
        description: '회고 삭제에 성공했습니다.',
        onBtnClick: () => navigate('/'),
      })
    } catch (error) {
      console.error(error)
      openModal({
        isError: true,
        title: '회고 삭제 실패',
        description:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  return (
    <div className="flex justify-start items-center gap-2">
      <Button
        variant={'line'}
        size={'sm'}
        onClick={onEdit}
      >
        <div className="flex justify-center items-center">
          <span className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.83236 2.50007C10.2005 2.50007 10.4996 2.79842 10.4997 3.16658C10.4997 3.53477 10.2005 3.83308 9.83236 3.83308H3.99984C3.90789 3.83317 3.83305 3.90795 3.83301 3.99991V16.0002C3.83314 16.0921 3.90795 16.1662 3.99984 16.1662H16.0002C16.0921 16.1662 16.1669 16.0921 16.167 16.0002V10.1669C16.167 9.79871 16.4653 9.49958 16.8335 9.49958C17.2016 9.49967 17.5 9.79877 17.5 10.1669V16.0002C17.4999 16.8285 16.8284 17.5 16.0002 17.5001H3.99984C3.17157 17.5 2.50014 16.8285 2.5 16.0002V3.99991C2.50004 3.17157 3.17151 2.50016 3.99984 2.50007H9.83236Z"
                fill="#3E3E3E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6955 2.02888C13.9558 1.76853 14.3775 1.76853 14.6379 2.02888L17.9712 5.36221C18.0962 5.48723 18.1665 5.65662 18.1665 5.8334C18.1665 6.01018 18.0962 6.17959 17.9712 6.3046L10.4712 13.8046C10.3462 13.9296 10.1768 13.9999 10 13.9999H6.66667C6.29851 13.9999 6.00021 13.7016 6.00016 13.3334V10.0001C6.00016 9.82328 6.07048 9.6539 6.19548 9.52888L13.6955 2.02888ZM7.33317 10.276V12.6669H9.72412L14.0568 8.33341L11.6667 5.94245L7.33317 10.276ZM12.6099 5.00007L15 7.39021L16.5568 5.8334L14.1667 3.44245L12.6099 5.00007Z"
                fill="#3E3E3E"
              />
            </svg>
          </span>
          <span>수정하기</span>
        </div>
      </Button>
      <Button
        variant={'redLine'}
        size={'sm'}
        onClick={() => handleDelete()}
      >
        <div className="flex justify-center items-center">
          <span className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.33333 8.54163C8.67851 8.54163 8.95833 8.82145 8.95833 9.16663V14.1666C8.95833 14.5118 8.67851 14.7916 8.33333 14.7916C7.98816 14.7916 7.70833 14.5118 7.70833 14.1666V9.16663C7.70833 8.82145 7.98816 8.54163 8.33333 8.54163Z"
                fill="#FF575F"
              />
              <path
                d="M11.6667 8.54163C12.0118 8.54163 12.2917 8.82145 12.2917 9.16663V14.1666C12.2917 14.5118 12.0118 14.7916 11.6667 14.7916C11.3215 14.7916 11.0417 14.5118 11.0417 14.1666V9.16663C11.0417 8.82145 11.3215 8.54163 11.6667 8.54163Z"
                fill="#FF575F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6667 1.04163C12.2745 1.04163 12.8572 1.28324 13.2869 1.71301C13.7167 2.14278 13.9583 2.7255 13.9583 3.33329V4.37496H17.5C17.8452 4.37496 18.125 4.65478 18.125 4.99996C18.125 5.34514 17.8452 5.62496 17.5 5.62496H16.4583V16.6666C16.4583 17.2744 16.2167 17.8571 15.7869 18.2869C15.3572 18.7167 14.7745 18.9583 14.1667 18.9583H5.83333C5.22555 18.9583 4.64282 18.7167 4.21305 18.2869C3.78328 17.8571 3.54167 17.2744 3.54167 16.6666V5.62496H2.5C2.15482 5.62496 1.875 5.34514 1.875 4.99996C1.875 4.65478 2.15482 4.37496 2.5 4.37496H6.04167V3.33329C6.04167 2.7255 6.28328 2.14278 6.71305 1.71301C7.14282 1.28324 7.72555 1.04163 8.33333 1.04163H11.6667ZM4.79167 16.6666C4.79167 16.9429 4.90149 17.2078 5.09684 17.4031C5.29219 17.5985 5.55707 17.7083 5.83333 17.7083H14.1667C14.4429 17.7083 14.7078 17.5985 14.9032 17.4031C15.0985 17.2078 15.2083 16.9429 15.2083 16.6666V5.62496H4.79167V16.6666ZM8.33333 2.29163C8.05707 2.29163 7.79219 2.40145 7.59684 2.5968C7.40149 2.79215 7.29167 3.05703 7.29167 3.33329V4.37496H12.7083V3.33329C12.7083 3.05703 12.5985 2.79215 12.4032 2.5968C12.2078 2.40145 11.9429 2.29163 11.6667 2.29163H8.33333Z"
                fill="#FF575F"
              />
            </svg>
          </span>
          <span>삭제하기</span>
        </div>
      </Button>
    </div>
  )
}

export default DetailHeaderButtons

import { mainTitle } from '@/styles/customStyles'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'

function HomeHeader() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col justify-start whitespace-nowrap">
        <h1 className={mainTitle()}>안녕하세요, 아무개님.</h1>
        <h1 className={mainTitle()}>오늘의 기록을 시작해볼까요?</h1>
      </div>
      <Button
        size={'lg'}
        variant={'black'}
        onClick={() => navigate('/retrospects/new')}
        className="whitespace-nowrap"
      >
        오늘 회고 작성하기
      </Button>
    </div>
  )
}

export default HomeHeader

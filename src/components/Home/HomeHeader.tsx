import { mainTitle } from '@/styles/customStyles'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

function HomeHeader() {
  const navigate = useNavigate()
  const nickname = useAuthStore((state) => state.user.nickname)

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col justify-start whitespace-nowrap">
        <h1 className={mainTitle()}>안녕하세요, {nickname || '사용자'}님.</h1>
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

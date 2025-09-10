import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate = useNavigate()
  return (
    <div
      className="self-stretch p-2 flex justify-center items-center gap-2"
      onClick={() => navigate('/')}
    >
      <img src="/sidebar_logo.png" />
    </div>
  )
}

export default Logo

import ButtonSection from './ButtonSection'
import DeletedFolder from './DeletedFolder'
import FolderSection from './FolderSection'
import Logo from './Logo'
import UserSection from './UserSection'

function Sidebar() {
  return (
    <div className="w-50 h-full px-1.5 pt-3 pb-2 bg-[var(--white)] shadow-[2px_0px_6px_0px_rgba(0,0,0,0.04)] inline-flex flex-col justify-between items-start">
      <div className="flex flex-col gap-6 w-full">
        <Logo />
        <ButtonSection />
        <FolderSection />
        <DeletedFolder />
      </div>
      <UserSection />
    </div>
  )
}

export default Sidebar

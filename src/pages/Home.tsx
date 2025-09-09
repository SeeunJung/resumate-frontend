import { useFolderStore } from '@/stores/useFolderStore'
import { useEffect } from 'react'

function Home() {
  const { fetchFolders } = useFolderStore()

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return <div></div>
}

export default Home

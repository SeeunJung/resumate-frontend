import HomeAnalysis from '@/components/Home/HomeAnalysis/HomeAnalysis'
import HomeHeader from '@/components/Home/HomeHeader'
import HomeRetrospect from '@/components/Home/HomeRetrospect/HomeRetrospect'
import CustomCalendar from '@/components/Home/HomeSection/Calendar'
import HomeStatistics from '@/components/Home/HomeSection/HomeStatistics'
import { useFolderStore } from '@/stores/useFolderStore'
import { isOAuthCallback } from '@/utils/oauth'
import { useEffect } from 'react'

function Home() {
  const { fetchFolders } = useFolderStore()

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  useEffect(() => {
    if (isOAuthCallback()) {
      console.log('OAuth 콜백 감지')
      console.log('OAuth 콜백 홈페이지 리다이렉트 완료')
    }
  })

  return (
    <main className="flex flex-col pt-20 pb-10 gap-6 pr-10 lg:pr-20">
      <header className="w-full">
        <HomeHeader />
      </header>

      <div className="flex gap-3 w-full">
        <section>
          <HomeAnalysis />
        </section>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-3 w-full items-stretch">
            <section className="flex-1 min-h-[250px]">
              <HomeStatistics />
            </section>
            <section className="flex-1 min-h-[250px]">
              <CustomCalendar />
            </section>
          </div>

          <section className="w-full min-h-[400px]">
            <HomeRetrospect />
          </section>
        </div>
      </div>
    </main>
  )
}

export default Home

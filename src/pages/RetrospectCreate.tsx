import { FormProvider, useForm } from 'react-hook-form'
import { questionList } from '@/mockData/questionData'
import Button from '@/components/common/Button'
import InfoCard from '@/components/Retrospect/RetrospectCreate/InfoCard'
import QuestionCard from '@/components/Retrospect/RetrospectCreate/QuestionCard'
import FloatingSidebar from '@/components/Retrospect/RetrospectCreate/FloatingSidebar/FloatingSidebar'
import type { Retrospect } from '@/types/Retrospect'
import { createRetrospect } from '@/services/retrospect'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface RetrospectFormValues {
  folderId: number
  parentFolderId?: number
  title: string
  reviewDate: string
  positives: string
  improvements: string
  learnings: string
  aspirations: string
  isCompleted: boolean
}

function RetrospectCreate() {
  const methods = useForm<RetrospectFormValues>({
    defaultValues: {
      folderId: 0,
      parentFolderId: undefined,
      title: '',
      reviewDate: '',
      positives: '',
      improvements: '',
      learnings: '',
      aspirations: '',
      isCompleted: false,
    },
  })

  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(false)
  const onSubmit = async (data: RetrospectFormValues) => {
    try {
      const payload: Retrospect = {
        folderId: data.folderId,
        title: data.title,
        reviewDate: data.reviewDate,
        positives: data.positives,
        improvements: data.improvements,
        learnings: data.learnings,
        aspirations: data.aspirations,
        isCompleted,
      }
      await createRetrospect(payload)
      console.log('회고 등록 성공')
      navigate(`/retrospects/${data.parentFolderId ?? 0}`)
    } catch (error) {
      console.error('등록 실패: ', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex justify-center w-full py-10 px-5 sm:px-10 lg:px-20 gap-8"
      >
        <div className="flex flex-col min-w-lg gap-10">
          <InfoCard />
          {questionList.map((q) => (
            <QuestionCard
              key={q.key}
              name={q.key}
              label={q.label}
              question={q.question}
              explanation={q.explanation}
            />
          ))}
        </div>

        <div className="flex flex-col w-fit sticky top-10 self-start gap-2">
          <FloatingSidebar />
          <div className="flex flex-col self-stretch gap-2">
            <Button
              type="submit"
              variant={'black'}
              size={'sm'}
              onClick={() => setIsCompleted(true)}
            >
              등록하기
            </Button>
            <Button
              variant={'line'}
              size={'sm'}
              onClick={() => setIsCompleted(false)}
            >
              임시저장
            </Button>
            <Button
              variant={'line'}
              size={'sm'}
            >
              불러오기
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default RetrospectCreate

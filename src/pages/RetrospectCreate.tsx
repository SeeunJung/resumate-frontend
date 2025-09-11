import { FormProvider, useForm } from 'react-hook-form'
import { questionList } from '@/mockData/questionData'
import Button from '@/components/common/Button'
import InfoCard from '@/components/Retrospect/RetrospectCreate/InfoCard'
import QuestionCard from '@/components/Retrospect/RetrospectCreate/QuestionCard'
import FloatingSidebar from '@/components/Retrospect/RetrospectCreate/FloatingSidebar/FloatingSidebar'
import type { Retrospect } from '@/types/Retrospect'
import { createRetrospect, editRetrospect } from '@/services/retrospect'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DraftModal from '@/components/Retrospect/RetrospectDraft/DraftModal'

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
  const location = useLocation()
  const initialData = location.state?.initialData as Retrospect | undefined

  const methods = useForm<RetrospectFormValues>({
    defaultValues: initialData || {
      folderId: 0,
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
  const [draftModalOpen, setDraftModalOpen] = useState(false)

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData)
    }
  }, [initialData])

  const onSubmit = async (data: RetrospectFormValues) => {
    try {
      const payload: Retrospect = {
        ...data,
        isCompleted,
      }
      if (initialData?.id) {
        await editRetrospect(initialData.id, payload)
      } else {
        await createRetrospect(payload)
      }
      navigate('/')
    } catch (error) {
      console.error('등록 실패: ', error)
    }
  }

  return (
    <div className="flex flex-col p-2">
      <div
        className="sticky top-0 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src="/sidebar_logo.png"
          className="w-35"
        />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex justify-center w-full py-10 px-5 sm:px-10 lg:px-20 gap-8"
        >
          <div className="flex flex-col min-w-lg gap-10">
            <InfoCard initialData={initialData} />
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
                type="button"
                variant={'black'}
                size={'sm'}
                onClick={() => {
                  setIsCompleted(true)
                  methods.handleSubmit(onSubmit)()
                }}
              >
                등록하기
              </Button>
              <Button
                type="button"
                variant={'line'}
                size={'sm'}
                onClick={() => {
                  setIsCompleted(false)
                  methods.handleSubmit(onSubmit)()
                }}
              >
                임시저장
              </Button>
              <Button
                type="button"
                variant={'line'}
                size={'sm'}
                onClick={() => setDraftModalOpen(true)}
              >
                불러오기
              </Button>
            </div>
          </div>
        </form>

        <DraftModal
          isOpen={draftModalOpen}
          onClose={() => setDraftModalOpen(false)}
        />
      </FormProvider>
    </div>
  )
}

export default RetrospectCreate

import { FormProvider, useForm } from 'react-hook-form'
import { questionList } from '@/mockData/questionData'
import Button from '@/components/common/Button'
import InfoCard from '@/components/Retrospect/RetrospectCreate/InfoCard'
import QuestionCard from '@/components/Retrospect/RetrospectCreate/QuestionCard'
import FloatingSidebar from '@/components/Retrospect/RetrospectCreate/FloatingSidebar/FloatingSidebar'

interface RetrospectFormValues {
  folderId: number
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
      title: '',
      reviewDate: '',
      positives: '',
      improvements: '',
      learnings: '',
      aspirations: '',
      isCompleted: false,
    },
  })

  const onSubmit = (data: RetrospectFormValues) => {
    console.log('폼 제출 데이터: ', data)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex justify-center w-full py-10 gap-8"
      >
        <div className="flex flex-col min-w-lg gap-10">
          <InfoCard />
          {questionList.map((q) => (
            <QuestionCard
              key={q.key}
              name={q.label}
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
              variant={'black'}
              size={'sm'}
            >
              등록하기
            </Button>
            <Button
              variant={'line'}
              size={'sm'}
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

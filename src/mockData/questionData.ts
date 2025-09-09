export const questionList: {
  key: string
  label: string
  question: string
  explanation: string
}[] = [
  {
    key: 'positives',
    label: 'Situation',
    question: '어떤 일을 하셨나요?',
    explanation: '끝낸 일과 하고 있는 일, 특이사항 등을 자유롭게 작성해보세요.',
  },
  {
    key: 'improvements',
    label: 'Task',
    question: '주요 해결 과제가 무엇이었나요?',
    explanation: '어떤 목표나 해결해야 할 문제, 맡은 역할에 대한 것도 좋아요.',
  },
  {
    key: 'learnings',
    label: 'Action',
    question: '시도한 일은 무엇이었나요?',
    explanation:
      '문제를 해결하거나 목표를 달성하기 위해 어떤 행동을 했는지 작성해보세요.',
  },
  {
    key: 'aspirations',
    label: 'Result',
    question: '성과는 무엇이었나요?',
    explanation: '구체적인 결과나 변화를 자유롭게 작성해보세요.',
  },
]

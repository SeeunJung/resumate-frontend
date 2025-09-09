import {
  ActionIcon,
  TaskIcon,
  SituationIcon,
  ResultIcon,
  type IconProps,
} from '@/components/common/Icons'
import type { Retrospect } from '@/types/Retrospect'

export const retrospectDetailItems: {
  key: keyof Pick<
    Retrospect,
    'positives' | 'improvements' | 'learnings' | 'aspirations'
  >
  label: string
  icon: React.ComponentType<IconProps>
}[] = [
  {
    key: 'positives',
    label: '어떤 일을 하셨나요?',
    icon: SituationIcon,
  },
  {
    key: 'improvements',
    label: '주요 해결 과제가 무엇이었나요?',
    icon: TaskIcon,
  },
  {
    key: 'learnings',
    label: '시도한 일은 무엇이었나요?',
    icon: ActionIcon,
  },
  {
    key: 'aspirations',
    label: '성과는 무엇이었나요?',
    icon: ResultIcon,
  },
]

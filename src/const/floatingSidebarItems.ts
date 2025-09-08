import {
  InfoIcon,
  ActionIcon,
  TaskIcon,
  SituationIcon,
  ResultIcon,
} from '@/components/common/Icons'

export const floatingSidebarItems = [
  {
    key: 'info',
    sectionKey: 'Info',
    label: '기본 정보',
    icon: InfoIcon,
  },
  {
    key: 'positives',
    sectionKey: 'Situation',
    label: '상황',
    icon: SituationIcon,
  },
  {
    key: 'improvements',
    sectionKey: 'Task',
    label: '과제',
    icon: TaskIcon,
  },
  {
    key: 'learnings',
    sectionKey: 'Action',
    label: '행동',
    icon: ActionIcon,
  },
  {
    key: 'aspirations',
    sectionKey: 'Result',
    label: '결과',
    icon: ResultIcon,
  },
]

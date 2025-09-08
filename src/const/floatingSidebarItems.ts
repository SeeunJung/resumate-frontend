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
    key: 'situation',
    sectionKey: 'Situation',
    label: '상황',
    icon: SituationIcon,
  },
  {
    key: 'task',
    sectionKey: 'Task',
    label: '과제',
    icon: TaskIcon,
  },
  {
    key: 'action',
    sectionKey: 'Action',
    label: '행동',
    icon: ActionIcon,
  },
  {
    key: 'result',
    sectionKey: 'Result',
    label: '결과',
    icon: ResultIcon,
  },
]

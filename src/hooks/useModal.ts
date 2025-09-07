import type { Optional } from '@/types/functions'
import type { ModalType } from '@/types/Modal'
import { useState } from 'react'

function useModal() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ModalType>({
    isError: false,
    title: '',
    description: '',
    onBtnClick: () => {},
  })
  const openModal = (content: Optional<ModalType, 'onBtnClick'>) => {
    setModalContent({
      ...content,
      onBtnClick: content.onBtnClick || (() => setModalOpen(false)),
    })
    setModalOpen(true)
  }
  return { modalOpen, setModalOpen, modalContent, openModal }
}

export default useModal

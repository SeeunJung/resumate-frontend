import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog'

interface AlertModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  contents: {
    isError: boolean
    title: string
    description: string
    onBtnClick?: () => void
  }
}

function AlertModal({ isOpen, onOpenChange, contents }: AlertModalProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{contents.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {contents.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {contents.isError && <AlertDialogCancel>창 닫기</AlertDialogCancel>}
          {!contents.isError && (
            <AlertDialogAction onClick={contents.onBtnClick}>
              이동
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertModal

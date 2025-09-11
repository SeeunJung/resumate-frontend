import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface CustomBreadcrumbProps {
  folderName?: string
  retroTitle?: string
  materialFolderName?: string
}
function CustomBreadcrumb({
  folderName,
  retroTitle,
  materialFolderName,
}: CustomBreadcrumbProps) {
  const isMaterial = !!materialFolderName

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs text-[var(--brand--black--default)] font-normal">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {isMaterial ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/materials">소재 보관함</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{materialFolderName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/retrospects">전체 폴더</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {folderName && (
              <BreadcrumbItem>
                <BreadcrumbPage>{folderName}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
            {retroTitle && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{retroTitle}</BreadcrumbItem>
              </>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CustomBreadcrumb

import { useFolderStore } from '@/stores/useFolderStore'
import { defaultInput } from '@/styles/customStyles'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function InfoInput() {
  const { register, setValue } = useFormContext()
  const [parentFolderId, setParentFolderId] = useState<number | ''>('')
  const { fetchParentFolders, fetchSubFolders, parentFolders, subFolders } =
    useFolderStore()

  useEffect(() => {
    fetchParentFolders()
  }, [fetchParentFolders])

  useEffect(() => {
    setValue('parentFolderId', parentFolderId)
    if (!parentFolderId) {
      setValue('folderId', 0)
      return
    }
    fetchSubFolders(parentFolderId)
  }, [parentFolderId])

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full items-center gap-8">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-sm text-black font-medium w-7">폴더</span>
          <select
            className={defaultInput('px-2 flex-1')}
            value={parentFolderId}
            onChange={(e) => setParentFolderId(Number(e.target.value))}
          >
            <option value="">폴더를 선택해주세요</option>
            {parentFolders.map((f) => (
              <option
                key={f.id}
                value={f.id}
              >
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-black font-medium w-8">날짜</span>
          <input
            type="date"
            className={defaultInput('flex-1')}
            {...register('reviewDate')}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 self-stretch">
        <span className="text-sm text-black font-medium w-8">제목</span>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className={defaultInput('w-full')}
          {...register('title')}
        />
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium w-10">태그</span>
        <select
          {...register('folderId')}
          className={defaultInput('input px-2 w-full')}
        >
          <option value="">주제를 태그해주세요</option>
          {subFolders.map((f) => (
            <option
              key={f.id}
              value={f.id}
            >
              {f.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InfoInput

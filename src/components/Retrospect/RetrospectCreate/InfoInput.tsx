import AddFolderModal from '@/components/common/Modal'
import SelectInput from '@/components/common/SelectInput'
import { useFolderStore } from '@/stores/useFolderStore'
import { defaultInput } from '@/styles/customStyles'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

function InfoInput() {
  const { register, control } = useFormContext()
  const { folders, fetchFolders } = useFolderStore()
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  const parentFolders = folders.filter((f) => f.parentId === null)
  const folderOptions: string[] = [
    ...parentFolders.map((f) => f.name!),
    '+ 새 폴더 추가',
  ]

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full items-center gap-8">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-sm text-black font-medium w-8">폴더</span>
          <Controller
            name="folderId"
            control={control}
            render={({ field }) => (
              <SelectInput
                placeholder="폴더를 선택해주세요"
                value={
                  parentFolders.find((f) => f.id === field.value)?.name ?? ''
                }
                onChange={(value: string) => {
                  if (value === 'addFolder') {
                    setIsFolderModalOpen(true)
                  } else {
                    const folder = parentFolders.find((f) => f.name === value)
                    if (folder) field.onChange(folder.id)
                  }
                }}
                options={folderOptions}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-black font-medium w-8">날짜</span>
          <input
            type="date"
            className={defaultInput('w-full')}
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
        <span className="text-sm text-black font-medium w-9">태그</span>
        <Controller
          name="subFolder"
          control={control}
          render={({ field }) => (
            <SelectInput
              placeholder="주제를 태그해주세요"
              name="folder"
              value={field.value}
              onChange={field.onChange}
              options={['기획', 'UI']}
            />
          )}
        />
      </div>

      {isFolderModalOpen && <AddFolderModal />}
    </div>
  )
}

export default InfoInput

// import SelectInput from '@/components/common/SelectInput'
// import { defaultInput } from '@/styles/customStyles'
// import { useState } from 'react'

// function InfoInput() {
//   const [folder, setFolder] = useState('')
//   const [subFolder, setSubFolder] = useState('')
//   const [title, setTitle] = useState('')
//   const [date, setDate] = useState('')

//   return (
//     <div className="flex flex-col gap-4 w-full">
//       <div className="flex w-full items-center gap-8">
//         <div className="flex flex-1 items-center gap-2">
//           <span className="text-sm text-black font-medium w-8">폴더</span>
//           <SelectInput
//             placeholder="폴더를 선택해주세요"
//             name={folder}
//             value={folder}
//             onChange={setFolder}
//             options={['기획', 'UI']}
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="text-sm text-black font-medium w-8">날짜</span>
//           <input
//             type="date"
//             className={defaultInput('w-full')}
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-2 flex-1 self-stretch">
//         <span className="text-sm text-black font-medium w-8">제목</span>
//         <input
//           type="text"
//           value={title}
//           placeholder="제목을 입력해주세요"
//           className={defaultInput('w-full')}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="flex items-center">
//         <span className="text-sm text-black font-medium w-9">태그</span>
//         <SelectInput
//           placeholder="주제를 태그해주세요"
//           name="folder"
//           value={subFolder}
//           onChange={setSubFolder}
//           options={['기획', 'UI']}
//         />
//       </div>
//     </div>
//   )
// }

// export default InfoInput

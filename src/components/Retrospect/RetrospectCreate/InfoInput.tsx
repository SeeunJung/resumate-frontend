import SelectInput from '@/components/common/SelectInput'
import { defaultInput } from '@/styles/customStyles'
import { useState } from 'react'

function InfoInput() {
  const [folder, setFolder] = useState('')
  const [subFolder, setSubFolder] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full items-center gap-8">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-sm text-black font-medium w-8">폴더</span>
          <SelectInput
            placeholder="폴더를 선택해주세요"
            name={folder}
            value={folder}
            onChange={setFolder}
            options={['기획', 'UI']}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-black font-medium w-8">날짜</span>
          <input
            type="date"
            className={defaultInput('w-full')}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 self-stretch">
        <span className="text-sm text-black font-medium w-8">제목</span>
        <input
          type="text"
          value={title}
          placeholder="제목을 입력하세요"
          className={defaultInput('w-full')}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <span className="text-sm text-black font-medium w-9">태그</span>
        <SelectInput
          placeholder="파트를 지정해주세요"
          name="folder"
          value={subFolder}
          onChange={setSubFolder}
          options={['기획', 'UI']}
        />
      </div>
    </div>
  )
}

export default InfoInput

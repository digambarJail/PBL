import React from 'react'

export const SearchResult = ({title , content}) => {
  return (
    <div className='mt-2 w-full overflow-hidden rounded-md'>
                <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
            
          <p class="text-sm font-medium text-gray-600">{title}</p>
          <p class="text-sm text-gray-500">{content}</p>
        </div>
    </div>
  )
}

import React from 'react'

export const SearchResult = ({question , asked}) => {
  return (
    <div className='mt-2 w-full overflow-hidden rounded-md'>
                <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
            
          <p class="text-sm font-medium text-gray-600">{question}</p>
          <p class="text-sm text-gray-500">{asked}</p>
        </div>
    </div>
  )
}

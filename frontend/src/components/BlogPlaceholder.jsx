import React from 'react'

export const BlogPlaceholder = () => {
  return (
<div class="min-h-screen">
  <header class="bg-gray-600 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="animate-pulse flex items-center space-x-4">
        <div class="h-12 w-12 bg-gray-700 rounded-full"></div>
        <div>
          <div class="h-4 w-20 bg-gray-700 rounded"></div>
          <div class="h-4 w-16 bg-gray-700 rounded mt-2"></div>
        </div>
      </div>
    </div>
  </header>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="animate-pulse space-y-4">
      <div class="h-4 bg-gray-600 rounded w-2/3"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded w-1/2"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded w-3/4"></div>
    </div>

    <div class="animate-pulse space-y-4 mt-12">
      <div class="h-4 bg-gray-600 rounded w-2/3"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded w-1/2"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
      <div class="h-4 bg-gray-600 rounded"></div>
    </div>
  </div>
</div>
  )
}

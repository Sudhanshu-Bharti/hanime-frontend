import React from 'react'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'


const page = () => {
  return (
    <div>
    <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
    </div>
  )
}

export default page
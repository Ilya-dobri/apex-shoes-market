import Catalog from '@/components/Catalog'
import React, { Suspense } from 'react'

const page = () => {
  return <div>
     <Suspense fallback={<div>Загрузка...</div>}>
      <Catalog />
    </Suspense>
  </div>
    
      
    
  
}

export default page

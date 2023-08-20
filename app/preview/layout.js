import Sidebar from '@/app/components/Sidebar'
import React from 'react'

const PreviewLayout = ({ children }) => {
  
  return (
    <React.Fragment>
      <section className="flex">
        <Sidebar />
        {children}
      </section>
    </React.Fragment>
  )
}

export default PreviewLayout
import Sidebar from '@/app/components/Sidebar'
import React from 'react'
import UpdateSidebar from '../components/UpdateSidebar'

const PreviewLayout = ({ children }) => {

  return (
    <React.Fragment>
      <section className="flex">
        <UpdateSidebar />
        {children}
      </section>
    </React.Fragment>
  )
}

export default PreviewLayout
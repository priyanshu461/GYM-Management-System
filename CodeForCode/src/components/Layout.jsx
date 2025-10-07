import React from 'react'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Footer from './layout/Footer'

const Layout = ({children}) => {
  return (
    <div>
         <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="flex">
             <Sidebar demo={false}/>
             <main className="flex-1 p-6">
                <Header/>
                {children}
                <Footer/>
             </main>
            </div>
         </div>
    </div>
  )
}

export default Layout
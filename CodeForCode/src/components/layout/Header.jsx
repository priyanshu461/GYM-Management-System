import React, { useState } from 'react'

import { Search, Bell} from "lucide-react";


const Header = () => {
      const [query, setQuery] = useState("");
    
  return (
    <div>
         <header className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-white p-2 shadow-sm flex items-center gap-3">
                <Search size={16} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders, products, customers..." className="outline-none text-sm w-80" />
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                <button className="px-3 py-2 rounded-lg hover:bg-slate-100">Export</button>
                <button className="px-3 py-2 rounded-lg hover:bg-slate-100">Filters</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-100"><Bell size={18} /></button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">Priyanshu Gautam</div>
                  <div className="text-xs text-slate-500">Admin</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-900 flex items-center justify-center text-white font-semibold">PG</div>
              </div>
            </div>
          </header>
    </div>
  )
}

export default Header
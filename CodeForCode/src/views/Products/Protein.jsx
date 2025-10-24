import React, { useState } from "react"
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
const products = [
  {
    id: 1,
    name: "Whey Protein Isolate",
    price: "₹3,199",
    image: "https://m.media-amazon.com/images/I/61j1JiaFLlL._SY450_.jpg",
    rating: 4.5,
    flavor: "Vanilla"
  },
  {
    id: 2,
    name: "Mass Gainer Pro",
    price: "₹2,899",
    image: "https://m.media-amazon.com/images/I/61DQLVMdwsL._SX679_.jpg",
    rating: 4.2,
    flavor: "Chocolate"
  },
  {
    id: 3,
    name: "BCAA Recovery Fuel",
    price: "₹1,499",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSypNEfAvIC1EUqM47UGCnYVCypP7-sVJxvY0NtFxd2Ng05FgJUwCzuLZQU5gGWj0-bTLAxWzOsUto7E200xaUipKPc1uKwTHjq6teU9cJMeVnFVTVx_IYUG9dc9doQQpVi3cYSxw&usqp=CAc",
    rating: 4.3,
    flavor: "Fruit Punch"
  },
  {
    id: 4,
    name: "Creatine Monohydrate",
    price: "₹999",
    image: "https://i0.wp.com/promptnutrition.com/wp-content/uploads/2023/12/img_0974.png?w=414&ssl=1",
    rating: 4.7,
    flavor: "Unflavored"
  },
  {
    id: 5,
    name: "Vegan Protein Blend",
    price: "₹3,299",
    image: "https://nutrabox.in/cdn/shop/files/Vegan_Banner_M.jpg?crop=center&height=1200&v=1748589953&width=1200",
    rating: 4.4,
    flavor: "Vanilla"
  },
  {
    id: 6,
    name: "Pre-Workout Energy",
    price: "₹1,799",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRnPRZjPJRJCvGcKIei09s6if3PuULmnCFmMk8IxCfg_fEXnKwXL_YQy33drsOp4H3UMAi_CUlTTaf4KqaNbWhXZ-0_DgCTG4wVVy_b6ubJclQxGNbB1hIyolZHng0tfiEBWtcpKWXu&usqp=CAc",
    rating: 4.1,
    flavor: "Blue Raspberry"
  },
  {
    id: 7,
    name: "Casein Protein",
    price: "₹2,599",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZNCQ3DXLPzV5opN9WZjKvKLIMoY48taB2g&s",
    rating: 4.6,
    flavor: "Chocolate"
  },
  {
    id: 8,
    name: "Hydrolyzed Whey",
    price: "₹3,499",
    image: "https://images-cdn.ubuy.co.in/678c657ddd32e911176e3409-optimum-nutrition-platinum-hydrowhey.jpg",
    rating: 4.8,
    flavor: "Strawberry"
  },
  {
    id: 9,
    name: "Protein Energy Bar (Pack of 6)",
    price: "₹899",
    image: "https://proathlix.com/cdn/shop/files/2NewProteinBarSlides.png?v=1755581600&width=720",
    rating: 4.0,
    flavor: "Mixed"
  },
  {
    id: 10,
    name: "Glutamine Recovery Powder",
    price: "₹1,299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2fMHotvoeI8unfvLiqZDiiLtVfNHL0c2z4g&s",
    rating: 4.2,
    flavor: "Unflavored"
  },
];


export default function Protein() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.flavor === category)
  )

  return (
   <Layout>
     <div className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900'
          : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'
      } ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      } px-4 py-6 md:px-8`}>
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 p-3 shadow-lg">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h1 className={`text-4xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-teal-600'
          }`}>
            Protein Store
          </h1>
          <p className={`mt-2 text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Explore our premium selection of protein powders for your fitness goals.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white/80 border-slate-300'
              } border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <svg className="absolute right-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            className={`${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white/80 border-slate-300'
            } border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm`}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Chocolate</option>
            <option>Vanilla</option>
          </select>
        </div>

        <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 transition-all duration-300">
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className={`group ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                : 'bg-gradient-to-br from-white/90 to-teal-50/90 border-slate-200'
            } rounded-3xl border overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm`}
          >
            <div className="aspect-square w-full overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5 flex flex-col justify-between h-[180px]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold text-lg truncate ${
                    theme === 'dark' ? 'text-white' : 'text-teal-700'
                  }`}>{product.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-400/20 px-2 py-1 rounded-full">
                    <span className="text-sm text-amber-500">★</span>
                    <span className="text-sm font-semibold text-amber-600">{product.rating}</span>
                  </div>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                }`}>{product.flavor}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className={`text-2xl font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>₹{product.price}</div>
                <div className="flex gap-2">
                  <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white text-sm px-4 py-2 rounded-xl font-semibold shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 transition-all duration-300">
                    Add
                  </button>
                  <button className={`${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-slate-200 hover:bg-slate-300'
                  } text-sm px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105`}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </Layout>
  )
}
import React, { useState } from "react"
import Layout from "../../components/Layout";
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
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.flavor === category)
  )

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 text-slate-900 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-teal-600">
          Protein Store
        </h1>
        <p className="text-slate-600 mt-1">
          Explore our premium selection of protein powders for your fitness goals.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex gap-3 flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Chocolate</option>
            <option>Vanilla</option>
          </select>
        </div>

        <button className="bg-teal-600 hover:bg-teal-500 transition px-5 py-2 rounded-lg font-semibold">
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-teal-900/20 hover:scale-105 transition transform"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col justify-between h-[160px]">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg truncate text-teal-600">{product.name}</h3>
                  <span className="text-sm text-amber-400">★ {product.rating}</span>
                </div>
                <p className="text-slate-600 text-sm">{product.flavor}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="text-xl font-extrabold text-slate-800">₹{product.price}</div>
                <div className="flex gap-2">
                  <button className="bg-teal-600 hover:bg-teal-500 text-sm px-3 py-1 rounded-lg font-semibold transition">
                    Add
                  </button>
                  <button className="bg-slate-200 hover:bg-slate-300 text-sm px-3 py-1 rounded-lg transition">
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
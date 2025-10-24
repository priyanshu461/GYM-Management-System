import React, { useMemo, useState } from "react"
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Amino Acid Supplements Catalog - React + Tailwind, no TypeScript
// Matches a dark, dashboard-like look with rounded cards and subtle glow
// Drop this component into your app and route to it. Tailwind must be configured.

const CATEGORIES = ["All", "BCAA", "EAA", "Glutamine", "Citrulline", "Arginine"]
const FLAVORS = ["Blue Raspberry", "Watermelon", "Lemon Lime", "Mango", "Grape", "Unflavoured"]




// 20 explicit products with unique images
const PRODUCTS = [
  {
    id: "aa-1",
    name: "BCAA Surge 2:1:1",
    category: "BCAA",
    flavor: "Blue Raspberry",
    grams: 300,
    servings: 60,
    activeLabel: "BCAAs",
    activeValue: 7,
    rating: 4.6,
    reviews: 128,
    price: 1199,
    mrp: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabhw5EnGYgT7n58svRnYKqDF43baD-TWlrA&s",
    tags: ["Sugar Free", "Value Pack"]
  },
  {
    id: "aa-2",
    name: "EAA Matrix 9",
    category: "EAA",
    flavor: "Watermelon",
    grams: 250,
    servings: 50,
    activeLabel: "EAAs",
    activeValue: 10,
    rating: 4.5,
    reviews: 102,
    price: 1299,
    mrp: 1599,
    image: "https://m.media-amazon.com/images/I/61ujdXsg-BL._UF350,350_QL80_.jpg",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-3",
    name: "Glutamine Micronized",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.4,
    reviews: 76,
    price: 999,
    mrp: 1299,
    image: "https://m.media-amazon.com/images/I/61+oB5KMMUL._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-4",
    name: "Citrulline Malate 2:1",
    category: "Citrulline",
    flavor: "Lemon Lime",
    grams: 250,
    servings: 50,
    activeLabel: "Citrulline",
    activeValue: 6,
    rating: 4.7,
    reviews: 141,
    price: 1099,
    mrp: 1399,
    image: "https://i5.walmartimages.com/seo/CON-CRET-Patented-Creatine-HCl-Lemon-Lime-Powder-Workout-Supplement-48-Servings_b29572d9-ec3e-420f-baa8-cae2f93fe261.4d6a31efe84d66d91dc5fdd86a0a44d3.png?odnHeight=320&odnWidth=320&odnBg=FFFFFF",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-5",
    name: "Arginine AKG Pump",
    category: "Arginine",
    flavor: "Grape",
    grams: 250,
    servings: 50,
    activeLabel: "Arginine",
    activeValue: 5,
    rating: 4.2,
    reviews: 64,
    price: 899,
    mrp: 1199,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAQJU4CEbCuB6fG4Eu3RIl3w7D5zje0kKItA&s",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-6",
    name: "BCAA + Electrolytes",
    category: "BCAA",
    flavor: "Mango",
    grams: 350,
    servings: 70,
    activeLabel: "BCAAs",
    activeValue: 8,
    rating: 4.3,
    reviews: 95,
    price: 1399,
    mrp: 1699,
    image: "https://m.media-amazon.com/images/I/71oNq0vFStL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-7",
    name: "EAA Zero Sugar",
    category: "EAA",
    flavor: "Blue Raspberry",
    grams: 300,
    servings: 60,
    activeLabel: "EAAs",
    activeValue: 9,
    rating: 4.5,
    reviews: 110,
    price: 1349,
    mrp: 1649,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-f5u1XsTyiuZjuWEKYAwndckEJBf1vylacvOCVepKpTulQTdkvfLuFpVeenCXtLSh_aY&usqp=CAU",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-8",
    name: "Glutamine + Vitamin C",
    category: "Glutamine",
    flavor: "Lemon Lime",
    grams: 350,
    servings: 70,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.3,
    reviews: 67,
    price: 1099,
    mrp: 1399,
    image: "https://www.nutritionwarehouse.co.nz/cdn/shop/files/ehp-labs-oxyshred-hardcore-lemon-sherbet_500x500.png?v=1750979745",
    tags: ["Value Pack"]
  },
  {
    id: "aa-9",
    name: "Citrulline Ultra",
    category: "Citrulline",
    flavor: "Watermelon",
    grams: 300,
    servings: 60,
    activeLabel: "Citrulline",
    activeValue: 8,
    rating: 4.6,
    reviews: 122,
    price: 1249,
    mrp: 1549,
    image: "https://m.media-amazon.com/images/I/61hsR6y9X+L._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-10",
    name: "Arginine Pure",
    category: "Arginine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Arginine",
    activeValue: 6,
    rating: 4.1,
    reviews: 58,
    price: 949,
    mrp: 1249,
    image: "https://m.media-amazon.com/images/I/61q3FRFGX3L.jpg_BO30,255,255,255_UF800,800_SR1910,1000,0,C_PIRIOTHREEANDHALF-medium,TopLeft,30,880_ZJPHNwYW4gZm9yZWdyb3VuZD0iIzU2NTk1OSIgZm9udD0iQW1hem9uRW1iZXIgNTAiID42NTwvc3Bhbj4=,500,883,420,420,0,0_PIin-overlay-frame,TopLeft,0,0_QL100_.jpg",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-11",
    name: "BCAA Fermented 4:1:1",
    category: "BCAA",
    flavor: "Grape",
    grams: 250,
    servings: 50,
    activeLabel: "BCAAs",
    activeValue: 8,
    rating: 4.4,
    reviews: 84,
    price: 1199,
    mrp: 1499,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lsPfR5ciLmVcjgymLdd2DP-Ff6EaOV_xQJCr2YqztbNQmd7JdNtBEV23cTCskmxGAdk&usqp=CAU",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-12",
    name: "EAA Hydrate Advanced",
    category: "EAA",
    flavor: "Mango",
    grams: 300,
    servings: 60,
    activeLabel: "EAAs",
    activeValue: 10,
    rating: 4.5,
    reviews: 133,
    price: 1399,
    mrp: 1699,
    image: "https://m.media-amazon.com/images/I/71zYaDycUFL._UF894,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-13",
    name: "Glutamine Recovery",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 250,
    servings: 50,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.2,
    reviews: 60,
    price: 899,
    mrp: 1199,
    image: "https://m.media-amazon.com/images/I/71HrvA+Eh+L._UF1000,1000_QL80_.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-14",
    name: "Citrulline Max Endurance",
    category: "Citrulline",
    flavor: "Grape",
    grams: 350,
    servings: 70,
    activeLabel: "Citrulline",
    activeValue: 7,
    rating: 4.6,
    reviews: 97,
    price: 1299,
    mrp: 1599,
    image: "https://www.gosupps.com/media/catalog/product/6/1/610TRWOKMzL.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-15",
    name: "Arginine AKG Pro",
    category: "Arginine",
    flavor: "Lemon Lime",
    grams: 250,
    servings: 50,
    activeLabel: "Arginine",
    activeValue: 5,
    rating: 4.0,
    reviews: 52,
    price: 899,
    mrp: 1199,
    image: "https://www.nutrabliss.in/cdn/shop/products/L-Arginine_LemonLime_Front.jpg?v=1716808820&width=1946",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-16",
    name: "BCAA Energy",
    category: "BCAA",
    flavor: "Watermelon",
    grams: 300,
    servings: 60,
    activeLabel: "BCAAs",
    activeValue: 7,
    rating: 4.3,
    reviews: 71,
    price: 1149,
    mrp: 1449,
    image: "https://d2crvu6tosum4d.cloudfront.net/media/listing/Prime-BCAA/gxn-prime-bcaa-60-servings-watermelon-1.jpg",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-17",
    name: "EAA + Electrolytes",
    category: "EAA",
    flavor: "Blue Raspberry",
    grams: 350,
    servings: 70,
    activeLabel: "EAAs",
    activeValue: 9,
    rating: 4.5,
    reviews: 120,
    price: 1449,
    mrp: 1749,
    image: "https://m.media-amazon.com/images/I/61OSADCK9NL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  },
  {
    id: "aa-18",
    name: "Glutamine Clean",
    category: "Glutamine",
    flavor: "Unflavoured",
    grams: 300,
    servings: 60,
    activeLabel: "Glutamine",
    activeValue: 5,
    rating: 4.3,
    reviews: 66,
    price: 1049,
    mrp: 1349,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGG5m8m5wn6UTtlzGU_5h_4owl0jv1gDgfyA&s",
    tags: ["Sugar Free"]
  },
  {
    id: "aa-19",
    name: "Citrulline Pump",
    category: "Citrulline",
    flavor: "Mango",
    grams: 250,
    servings: 50,
    activeLabel: "Citrulline",
    activeValue: 6,
    rating: 4.4,
    reviews: 81,
    price: 1099,
    mrp: 1399,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz2rWnZQRh9QHMfaClWecCsDSzs_EHaFoPig&s",
    tags: ["Vegan Friendly"]
  },
  {
    id: "aa-20",
    name: "Arginine Performance",
    category: "Arginine",
    flavor: "Grape",
    grams: 350,
    servings: 70,
    activeLabel: "Arginine",
    activeValue: 6,
    rating: 4.1,
    reviews: 59,
    price: 999,
    mrp: 1299,
    image: "https://m.media-amazon.com/images/I/71oLLgANBAL._UF350,350_QL80_.jpg",
    tags: ["Value Pack"]
  }
];


function Badge({ children }) {
  return <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/10 ring-1 ring-white/10">{children}</span>
}

function Rating({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★"
    if (i === full && half) return "⯪"
    return "☆"
  })
  return <span className="text-amber-400">{stars.join(" ")}</span>
}

export default function AminoAcidSuppliments() {
  const { theme } = useTheme();
  const [tab, setTab] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [quick, setQuick] = useState(null)

  const list = useMemo(() => {
    let l = PRODUCTS.filter(p => (tab === "All" || p.category === tab) && p.name.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === "priceLow") l = [...l].sort((a, b) => a.price - b.price)
    if (sortBy === "priceHigh") l = [...l].sort((a, b) => b.price - a.price)
    if (sortBy === "rating") l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [tab, search, sortBy])

  return (
  <Layout>
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white' : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 text-slate-900'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 p-3 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-teal-600">
              Amino Acid Supplements
            </h1>
            <p className="text-slate-600 mt-2 text-base">
              Essential amino acids for muscle recovery, performance, and overall health.
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex gap-2 bg-white/80 p-1 rounded-xl ring-1 ring-slate-300 w-fit shadow-sm">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  tab === c ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg" : "hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="md:ml-auto grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-full bg-white/80 ring-1 ring-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
              <svg className="absolute right-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/80 ring-1 ring-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            >
              <option value="popular">Sort by popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 transition-all duration-300">
              Export list
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 ring-1 ring-slate-300 hover:ring-teal-500/60 transition shadow-lg hover:shadow-teal-900/30 hover:scale-105"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-teal-600">
                      {p.name}
                    </h3>
                    <div className="text-xs text-slate-600">
                      {p.category} · {p.flavor}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <Rating value={p.rating} />
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {p.reviews} reviews
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-slate-200 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Net wt</div>
                    <div className="font-semibold">{p.grams} g</div>
                  </div>
                  <div className="rounded-lg bg-slate-200 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Servings</div>
                    <div className="font-semibold">{p.servings}</div>
                  </div>
                  <div className="rounded-lg bg-slate-200 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">{p.activeLabel}</div>
                    <div className="font-semibold">{p.activeValue} g</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-800">
                      ₹{p.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-600 line-through">
                      ₹{p.mrp.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuick(p)}
                      className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-sm"
                    >
                      View
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 font-semibold text-sm">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Drawer */}
      <div className={`fixed inset-0 z-50 ${quick ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setQuick(null)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            quick ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[32rem] bg-white ring-1 ring-slate-300 transition-transform ${
            quick ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {quick && (
            <div className="h-full flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-slate-300">
                <div>
                  <div className="text-xs text-slate-600">
                    {quick.category} · {quick.flavor}
                  </div>
                  <h3 className="text-xl font-bold">{quick.name}</h3>
                </div>
                <button
                  onClick={() => setQuick(null)}
                  className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300"
                >
                  Close
                </button>
              </div>

              <div className="p-4 overflow-auto space-y-4">
                <img
                  src={quick.image}
                  alt={quick.name}
                  className="w-full h-56 object-cover rounded-xl ring-1 ring-slate-300"
                />

                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="rounded-lg bg-slate-100 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Net wt</div>
                    <div className="font-semibold">{quick.grams} g</div>
                  </div>
                  <div className="rounded-lg bg-slate-100 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Servings</div>
                    <div className="font-semibold">{quick.servings}</div>
                  </div>
                  <div className="rounded-lg bg-slate-100 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">{quick.activeLabel}</div>
                    <div className="font-semibold">{quick.activeValue} g</div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-100 ring-1 ring-slate-300 p-4">
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Essential amino acids for muscle repair</li>
                    <li>Supports protein synthesis and recovery</li>
                    <li>Batch tested and clean label</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-slate-300 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold">
                    ₹{quick.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-600 line-through">
                    ₹{quick.mrp.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300">
                    Add to wishlist
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 font-semibold">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
  }

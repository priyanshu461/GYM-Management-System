import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout";

const CATEGORIES = ["All", "Men", "Women", "Unisex", "Immunity", "Performance"];
const FORMS = ["Tablets", "Capsules", "Gummies", "Powder"];

const PRODUCTS=[
  {
    "id": "mv-1",
    "name": "Men's Performance Multivitamin",
    "category": "Men",
    "form": "Tablets",
    "servings": 30,
    "nutrients": 25,
    "rating": 4.6,
    "reviews": 128,
    "price": 699,
    "mrp": 949,
    "image": "https://www.garagegymreviews.com/wp-content/uploads/2024/10/perfoemance-lab-nutrigenesis-men-bottle-and-capsules.jpg",
    "tags": ["Sugar Free", "Daily Use"]
  },
  {
    "id": "mv-2",
    "name": "Women's Immunity Booster",
    "category": "Women",
    "form": "Capsules",
    "servings": 45,
    "nutrients": 28,
    "rating": 4.8,
    "reviews": 212,
    "price": 799,
    "mrp": 1049,
    "image": "https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/pgkk25vpxlu8ehf6yotb.jpg",
    "tags": ["Natural Extracts", "Complete Formula"]
  },
  {
    "id": "mv-3",
    "name": "Unisex Daily Multivitamin",
    "category": "Unisex",
    "form": "Tablets",
    "servings": 60,
    "nutrients": 24,
    "rating": 4.5,
    "reviews": 175,
    "price": 599,
    "mrp": 849,
    "image": "https://m.media-amazon.com/images/I/71b9NZfGewL._UF1000,1000_QL80_.jpg",
    "tags": ["Sugar Free", "Daily Use"]
  },
  {
    "id": "mv-4",
    "name": "Immunity Shield Complex",
    "category": "Immunity",
    "form": "Gummies",
    "servings": 30,
    "nutrients": 30,
    "rating": 4.7,
    "reviews": 95,
    "price": 749,
    "mrp": 999,
    "image": "https://m.media-amazon.com/images/I/6139SmDT+TL._UF1000,1000_QL80_.jpg",
    "tags": ["Natural Extracts", "Complete Formula"]
  },
  {
    "id": "mv-5",
    "name": "Performance Max Multivitamin",
    "category": "Performance",
    "form": "Powder",
    "servings": 30,
    "nutrients": 32,
    "rating": 4.9,
    "reviews": 342,
    "price": 999,
    "mrp": 1249,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1wW1oT4SJfQWvIWNPvUrEadRkPZV1SIL0A&s",
    "tags": ["Sugar Free", "Complete Formula"]
  },
  {
    "id": "mv-6",
    "name": "Men's Daily Health Boost",
    "category": "Men",
    "form": "Capsules",
    "servings": 30,
    "nutrients": 22,
    "rating": 4.3,
    "reviews": 88,
    "price": 549,
    "mrp": 799,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/1/481119866/CW/KW/KD/32319264/men-booster-capsule.jpg",
    "tags": ["Natural Extracts", "Daily Use"]
  },
  {
    "id": "mv-7",
    "name": "Women's Energy Multivitamin",
    "category": "Women",
    "form": "Tablets",
    "servings": 60,
    "nutrients": 27,
    "rating": 4.7,
    "reviews": 180,
    "price": 749,
    "mrp": 999,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1LLIh6SiNfS8LrMHaP2Gbn-00n6n2c-u5w&s",
    "tags": ["Sugar Free", "Complete Formula"]
  },
  {
    "id": "mv-8",
    "name": "Unisex Active Formula",
    "category": "Unisex",
    "form": "Powder",
    "servings": 45,
    "nutrients": 29,
    "rating": 4.6,
    "reviews": 140,
    "price": 799,
    "mrp": 1049,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0JhbUO223Vf-98OjMpdkVqTMYuHFTXUy3g&s",
    "tags": ["Natural Extracts", "Complete Formula"]
  },
  {
    "id": "mv-9",
    "name": "Immunity+ Gummies",
    "category": "Immunity",
    "form": "Gummies",
    "servings": 30,
    "nutrients": 26,
    "rating": 4.4,
    "reviews": 65,
    "price": 699,
    "mrp": 949,
    "image": "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/4fb8401ead2e43c9b930ca5cf1b1cb91.jpg?dpr=3&format=auto",
    "tags": ["Sugar Free", "Daily Use"]
  },
  {
    "id": "mv-10",
    "name": "Performance X Pro Mix",
    "category": "Performance",
    "form": "Powder",
    "servings": 60,
    "nutrients": 34,
    "rating": 4.9,
    "reviews": 400,
    "price": 1199,
    "mrp": 1449,
    "image": "https://m.media-amazon.com/images/I/71XcJmeXZpL._UF350,350_QL80_.jpg",
    "tags": ["Natural Extracts", "Complete Formula"]
  },
  {
    "id": "mv-11",
    "name": "Men's Muscle Support",
    "category": "Men",
    "form": "Tablets",
    "servings": 45,
    "nutrients": 29,
    "rating": 4.7,
    "reviews": 155,
    "price": 799,
    "mrp": 1049,
    "image": "https://www.jiomart.com/images/product/original/rvoc0ytk2s/nature-sure-muscle-charge-tablets-for-men-1-pack-60-tablets-product-images-orvoc0ytk2s-p595115570-0-202303271436.jpg?im=Resize=(420,420)",
    "tags": ["Sugar Free", "Complete Formula"]
  },
  {
    "id": "mv-12",
    "name": "Women's Wellness Complex",
    "category": "Women",
    "form": "Capsules",
    "servings": 30,
    "nutrients": 24,
    "rating": 4.5,
    "reviews": 98,
    "price": 649,
    "mrp": 899,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIvApUYx0kQHMbsZtrJkU4f-P7zRuxwCVfnQ&s",
    "tags": ["Natural Extracts", "Daily Use"]
  },
  {
    "id": "mv-13",
    "name": "Unisex Recovery Boost",
    "category": "Unisex",
    "form": "Powder",
    "servings": 60,
    "nutrients": 30,
    "rating": 4.8,
    "reviews": 260,
    "price": 899,
    "mrp": 1149,
    "image": "https://m.media-amazon.com/images/I/71xv4Baj8qL._UF350,350_QL50_.jpg",
    "tags": ["Sugar Free", "Complete Formula"]
  },
  {
    "id": "mv-14",
    "name": "Daily Immunity Tablets",
    "category": "Immunity",
    "form": "Tablets",
    "servings": 30,
    "nutrients": 25,
    "rating": 4.3,
    "reviews": 75,
    "price": 599,
    "mrp": 849,
    "image": "https://m.media-amazon.com/images/I/71P+jwR0abL._UF350,350_QL80_.jpg",
    "tags": ["Natural Extracts", "Daily Use"]
  },
  {
    "id": "mv-15",
    "name": "Performance Strength Mix",
    "category": "Performance",
    "form": "Powder",
    "servings": 45,
    "nutrients": 33,
    "rating": 4.8,
    "reviews": 320,
    "price": 1099,
    "mrp": 1349,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_y9A-Sz-fXCFoI5FXI7vT93gHsBQF6rmRHg&s",
    "tags": ["Sugar Free", "Complete Formula"]
  },
  {
    "id": "mv-16",
    "name": "Men's Daily Gummies",
    "category": "Men",
    "form": "Gummies",
    "servings": 30,
    "nutrients": 24,
    "rating": 4.2,
    "reviews": 60,
    "price": 549,
    "mrp": 799,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1-XpPHPyJnHWSXNrUfoeXvbS88ftvo3ygwdZWzgj0TZUmmErKWCEdlK2CpZbxNmv4borN6Qsz_FVNowbSUrdzcaSab5JR5Y-joikNy0QkIuMyK7-IFhpi9A",
    "tags": ["Natural Extracts", "Daily Use"]
  },
  {
    "id": "mv-17",
    "name": "Women's Iron & B-Complex",
    "category": "Women",
    "form": "Tablets",
    "servings": 30,
    "nutrients": 26,
    "rating": 4.6,
    "reviews": 112,
    "price": 699,
    "mrp": 949,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWp3tGzLkbWubCEdXsfU7R7w9JnE1LsnitA&s",
    "tags": ["Sugar Free", "Daily Use"]
  },
  {
    "id": "mv-18",
    "name": "Unisex Multivitamin Pro",
    "category": "Unisex",
    "form": "Capsules",
    "servings": 45,
    "nutrients": 28,
    "rating": 4.7,
    "reviews": 190,
    "price": 799,
    "mrp": 1049,
    "image": "https://m.media-amazon.com/images/I/71sMSe1zCLL._UF1000,1000_QL80_.jpg",
    "tags": ["Natural Extracts", "Complete Formula"]
  },
  {
    "id": "mv-19",
    "name": "Immunity Zinc Gummies",
    "category": "Immunity",
    "form": "Gummies",
    "servings": 30,
    "nutrients": 27,
    "rating": 4.5,
    "reviews": 85,
    "price": 649,
    "mrp": 899,
    "image": "https://m.media-amazon.com/images/I/71Vqd9pS2wL._UF894,1000_QL80_.jpg",
    "tags": ["Sugar Free", "Daily Use"]
  },
  {
    "id": "mv-20",
    "name": "Performance Ultra Boost",
    "category": "Performance",
    "form": "Powder",
    "servings": 60,
    "nutrients": 35,
    "rating": 5.0,
    "reviews": 480,
    "price": 1299,
    "mrp": 1549,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMHQqLSfOeq771l2dZhSyEh45kz0YhL5sp3Q&s",
    "tags": ["Natural Extracts", "Complete Formula"]
  }
]


function Badge({ children }) {
  return (
    <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-gray-200 ring-1 ring-gray-300">
      {children}
    </span>
  );
}

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "⯪";
    return "☆";
  });
  return <span className="text-amber-400">{stars.join(" ")}</span>;
}

export default function MultivitaminAndMinerals() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [quick, setQuick] = useState(null);

  const list = useMemo(() => {
    let l = PRODUCTS.filter(
      (p) =>
        (tab === "All" || p.category === tab) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "priceLow") l = [...l].sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") l = [...l].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [tab, search, sortBy]);

  return (
   <Layout>
     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-teal-600">
            Multivitamins & Minerals
          </h1>
          <p className="text-slate-600 mt-1">
            Explore essential nutrients for performance, immunity, and recovery.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl ring-1 ring-slate-300 w-fit">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === c ? "bg-teal-600" : "hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="md:ml-auto grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="bg-slate-100 ring-1 ring-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 ring-1 ring-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="popular">Sort by popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="bg-slate-100 ring-1 ring-slate-300 rounded-lg px-4 py-2 text-sm hover:bg-slate-200">
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
                      {p.category} · {p.form}
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
                    <div className="text-slate-700">Servings</div>
                    <div className="font-semibold">{p.servings}</div>
                  </div>
                  <div className="rounded-lg bg-slate-200 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Nutrients</div>
                    <div className="font-semibold">{p.nutrients}</div>
                  </div>
                  <div className="rounded-lg bg-slate-200 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Form</div>
                    <div className="font-semibold">{p.form}</div>
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
                    {quick.category} · {quick.form}
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
                    <div className="text-slate-700">Servings</div>
                    <div className="font-semibold">{quick.servings}</div>
                  </div>
                  <div className="rounded-lg bg-slate-100 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Nutrients</div>
                    <div className="font-semibold">{quick.nutrients}</div>
                  </div>
                  <div className="rounded-lg bg-slate-100 ring-1 ring-slate-300 p-2">
                    <div className="text-slate-700">Form</div>
                    <div className="font-semibold">{quick.form}</div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-100 ring-1 ring-slate-300 p-4">
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Essential daily micronutrients</li>
                    <li>Boosts immunity and recovery</li>
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

import Layout from "../../components/Layout";

import React, { useMemo, useState } from "react";


const PRODUCTS= [
  // PRE 1-10
  { id: 1, name: "Nitro Surge Pre", category: "Pre", brand: "Volt Labs", price: 29.99, flavor: "Blue Raspberry", servings: 30, rating: 4.5, stock: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0XApBokz86IYVxbTnAn8gEy4Ruxocaihpg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdSB31UKXQzKMvYKCKVmHKthF6Zd7y2M5AVlwRwc5hdE207agKsdxE-OY8YyEna7zVPE&usqp=CAU" },
  { id: 2, name: "Alpha Ignite", category: "Pre", brand: "PrimeForce", price: 34.99, flavor: "Watermelon", servings: 25, rating: 4.2, stock: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzxhazn4OmB6V_-syCM3K7kSBCoN1jz7twQ&s" },
  { id: 3, name: "Pulse Max", category: "Pre", brand: "CoreFuel", price: 39.0, flavor: "Fruit Punch", servings: 20, rating: 4.1, stock: 0, image: "https://5.imimg.com/data5/SELLER/Default/2023/12/372275485/IU/HO/WS/94540127/300g-muscle-max-fruit-punch-pre-workout-supplement.jpg" },
  { id: 4, name: "Storm Pre", category: "Pre", brand: "IronWorks", price: 27.5, flavor: "Mango", servings: 30, rating: 4.0, stock: 14, image: "https://cdn.shopify.com/s/files/1/0301/5737/3576/files/stormmaker-peachmango1.png?v=1660285967" },
  { id: 5, name: "Rocket Fuel", category: "Pre", brand: "Lift Co.", price: 32.0, flavor: "Lemon Lime", servings: 30, rating: 4.7, stock: 33, image: "https://m.media-amazon.com/images/I/61xP47mio7L._UF1000,1000_QL80_.jpg" },
  { id: 6, name: "Charge V2", category: "Pre", brand: "AthletiX", price: 35.99, flavor: "Pineapple", servings: 25, rating: 4.3, stock: 6, image: "https://healthfarmnutrition.com/cdn/shop/files/nb_cell_pineapple_3.jpg?v=1744877080&width=1500" },
  { id: 7, name: "Lift Off", category: "Pre", brand: "PeakLab", price: 26.99, flavor: "Green Apple", servings: 30, rating: 3.9, stock: 21, image: "https://5.imimg.com/data5/SELLER/Default/2023/3/292577503/JH/RD/ZD/119857853/post-workouts-500x500.jpg" },
  { id: 8, name: "Thunderbolt", category: "Pre", brand: "Rival Sports", price: 31.49, flavor: "Grape", servings: 30, rating: 4.4, stock: 19, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjEEH21zJDWUysUTTXiwMFYS5kM-1unjkkvi7VH0GJDsJfpnrHCf2s2tK5YxU8HMpVYI&usqp=CAU" },
  { id: 9, name: "Edge Pre", category: "Pre", brand: "Vector", price: 28.5, flavor: "Orange", servings: 20, rating: 4.0, stock: 12, image: "https://m.media-amazon.com/images/I/41UNk5vORcL.jpg_BO30,255,255,255_UF800,800_SR1910,1000,0,C_PIin-overlay-frame,TopLeft,0,0_QL100_.jpg" },
  { id: 10, name: "Beta Burst", category: "Pre", brand: "HexaFit", price: 33.99, flavor: "Berry Blast", servings: 25, rating: 4.6, stock: 8, image: "https://m.media-amazon.com/images/I/61NgfK+FHKL._UF350,350_QL80_.jpg" },
  // INTRA 11-20
  { id: 11, name: "Hydra BCAA", category: "Intra", brand: "Volt Labs", price: 24.99, flavor: "Lemon Ice", servings: 30, rating: 4.2, stock: 15, image: "https://www.muscleandstrength.in/cdn/shop/products/61b5jVEjVUL._SL1000.jpg?v=1705733365&width=416" },
  { id: 12, name: "Flow EAA", category: "Intra", brand: "PrimeForce", price: 29.99, flavor: "Peach", servings: 30, rating: 4.4, stock: 25, image: "https://files.ekmcdn.com/2ab763/images/optimum-nutrition-eaa-energy-432g-1078-p.jpg" },
  { id: 13, name: "Endure Mix", category: "Intra", brand: "CoreFuel", price: 22.49, flavor: "Coconut", servings: 25, rating: 4.0, stock: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnaGksUB4kFZgkhBaqFLE6fkJgjLX_0Zkhw&s" },
  { id: 14, name: "Amino Rush", category: "Intra", brand: "IronWorks", price: 26.0, flavor: "Blue Ice", servings: 30, rating: 4.1, stock: 17, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRT74iyAMsW1OvuvHZpt-_NwslgNtea7nPnpwcIxz-tzf6DxaufZ2QQEYaHZCjtEWAmcQ&usqp=CAU" },
  { id: 15, name: "Train Sustain", category: "Intra", brand: "Lift Co.", price: 27.99, flavor: "Lime", servings: 30, rating: 4.3, stock: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGAIj1YCGTp9NSHRZ8I8zEaWUHwEDxRK78rVa8dW2U_f6L4buOSNX0_cA0RoBFW6rXdU&usqp=CAU" },
  { id: 16, name: "Motion Fuel", category: "Intra", brand: "AthletiX", price: 25.99, flavor: "Wild Cherry", servings: 30, rating: 3.8, stock: 11, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcrCSUxxcv1MyOnLAMj6eEf4UGh8sqnBn5w&s" },
  { id: 17, name: "IsoCharge EAA", category: "Intra", brand: "PeakLab", price: 28.49, flavor: "Tropical", servings: 25, rating: 4.5, stock: 14, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5U-PKQY1enCtdu1r9P8FL5GzBgI54XmlHnHXeLgJZjfb36oaHbod6ORFpGGwXMb095s&usqp=CAU" },
  { id: 18, name: "Refuel Pro", category: "Intra", brand: "Rival Sports", price: 23.5, flavor: "Raspberry", servings: 30, rating: 4.0, stock: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCdAGGCNNegrai2l_ZHQfJrzV5mewuC28jZb2qCIUgTn3gFZQdEpNPSLKVtpYU19C_zo&usqp=CAU" },
  { id: 19, name: "HydroMix BCAA", category: "Intra", brand: "Vector", price: 21.99, flavor: "Citrus", servings: 30, rating: 3.9, stock: 13, image: "https://images-eu.ssl-images-amazon.com/images/I/71zv7OmUwwL._AC_UL210_SR210,210_.jpg" },
  { id: 20, name: "Amino Stream", category: "Intra", brand: "HexaFit", price: 26.49, flavor: "Grape Ice", servings: 30, rating: 4.2, stock: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBq6hlJPZsA_e45T6DBMrDfs3LALNkbGyimEJKlsAl5yKpyzkA7oRvORBi5bRRh1TZVa0&usqp=CAU" },
  // POST 21-30
  { id: 21, name: "Iso Whey 100", category: "Post", brand: "Volt Labs", price: 49.99, flavor: "Vanilla", servings: 30, rating: 4.6, stock: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGm43yFXwSBe2WFjGd1AJlFhBZKpU4a_aqr6qI0RfKwMLaCnOv-G_VpkN-enVQtCt-jY&usqp=CAU" },
  { id: 22, name: "Rebuild Whey", category: "Post", brand: "PrimeForce", price: 44.0, flavor: "Chocolate", servings: 27, rating: 4.4, stock: 28, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPDCQX7xj6o0qp8fLnfR-Gtkr3x93Jul8l6lBzVU0cYlQGqISdXp-OpV9onIx2VperrUQ&usqp=CAU" },
  { id: 23, name: "Recover Matrix", category: "Post", brand: "CoreFuel", price: 46.5, flavor: "Strawberry", servings: 25, rating: 4.1, stock: 18, image: "https://images-na.ssl-images-amazon.com/images/I/81+cEMZJdtL._AC_UL600_SR600,600_.jpg" },
  { id: 24, name: "Regen Blend", category: "Post", brand: "IronWorks", price: 42.99, flavor: "Cookies & Cream", servings: 30, rating: 4.2, stock: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMngGeym9ktDa8M-BOmpnKY8GBB3DRo8yVVQ&s" },
  { id: 25, name: "Lean Build", category: "Post", brand: "Lift Co.", price: 39.99, flavor: "Banana", servings: 24, rating: 3.9, stock: 16, image: "https://bootynbuffstore.com/cdn/shop/files/BootyNBuffLeanProtein28Serves_1kg_CaramelisedBananaV3-BootyNBuff.png?v=1719024338&width=1080" },
  { id: 26, name: "Whey Prime", category: "Post", brand: "AthletiX", price: 45.49, flavor: "Mocha", servings: 28, rating: 4.5, stock: 7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLUHfefm29T5njn7UDrV-ALaZKcjH7xfXMLFj5SSKq0VpCmmn6-PMxMJD8QWSWbSJvpg&usqp=CAU" },
  { id: 27, name: "Ultra ISO", category: "Post", brand: "PeakLab", price: 52.0, flavor: "Salted Caramel", servings: 30, rating: 4.8, stock: 0, image: "https://dymatize.imgix.net/production/products/DYMA_PDP_ISO100_SaltedCaramel_FB_HEADER_DESKTOP_2025-06-13-203229_qvfd.jpg?ar=3840%3A2156&auto=format%2Ccompress&fit=crop&ixlib=php-3.1.0&w=2600" },
  { id: 28, name: "Anabolic Repair", category: "Post", brand: "Rival Sports", price: 43.5, flavor: "Chocolate Peanut", servings: 26, rating: 4.3, stock: 23, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIkE3zEU5x9PjQybt8WaFSZK0177fkyR62FuOsRuryHonaqaV6LPK-gJ87RmckjFKSaM&usqp=CAU" },
  { id: 29, name: "Protein 360", category: "Post", brand: "Vector", price: 41.0, flavor: "Vanilla Bean", servings: 30, rating: 4.0, stock: 19, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6cLksauynaKrDb3D8ncY4vR3d_ZN6Ma0cyCkJh8plRgvmD7ShimdAPaWxcfZCxBJTqk&usqp=CAU" },
  { id: 30, name: "Regen Pro", category: "Post", brand: "HexaFit", price: 47.99, flavor: "Chocolate Fudge", servings: 27, rating: 4.6, stock: 15, image: "https://m.media-amazon.com/images/I/71oNpPrP8PL._SX679_.jpg" },
];

const CategoryPill = ({ value, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
      active ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400"
    }`}
  >
    {value}
  </button>
);

const Rating = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "★";
    if (i === full && half) return "☆";
    return "☆";
  });
  return <span className="text-yellow-400 text-sm" aria-label={`Rated ${value}`}>{stars.join(" ")}</span>;
};

export default function Suppliments() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let out = [...PRODUCTS];
    if (category !== "All") out = out.filter(p => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(p => (p.name + " " + p.brand + " " + p.flavor).toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": out.sort((a,b) => a.price - b.price); break;
      case "price-desc": out.sort((a,b) => b.price - a.price); break;
      case "rating": out.sort((a,b) => b.rating - a.rating); break;
      case "stock": out.sort((a,b) => b.stock - a.stock); break;
      default: out.sort((a,b) => (b.rating - a.rating) || (b.stock - a.stock));
    }
    return out;
  }, [query, category, sort]);

  const counts = useMemo(() => ({
    total: PRODUCTS.length,
    pre: PRODUCTS.filter(p=>p.category==='Pre').length,
    intra: PRODUCTS.filter(p=>p.category==='Intra').length,
    post: PRODUCTS.filter(p=>p.category==='Post').length,
    oos: PRODUCTS.filter(p=>p.stock===0).length,
  }), []);

  return (
   <Layout>
     <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-gray-600 text-sm mt-1">Pre, Intra, and Post workout supplements</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-sm hover:bg-gray-200">High contrast</button>
            <select
              value={sort}
              onChange={(e)=>setSort(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="stock">Stock: High to Low</option>
            </select>
            <button onClick={()=>window.print()} className="px-3 py-2 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm hover:bg-emerald-200">Export</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-gray-600 text-sm">Total products</p>
            <p className="text-2xl font-semibold mt-1">{counts.total}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-gray-600 text-sm">Pre workout</p>
            <p className="text-2xl font-semibold mt-1">{counts.pre}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-gray-600 text-sm">Intra workout</p>
            <p className="text-2xl font-semibold mt-1">{counts.intra}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-gray-600 text-sm">Out of stock</p>
            <p className="text-2xl font-semibold mt-1">{counts.oos}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 flex-wrap">
            {['All','Pre','Intra','Post'].map(t => (
              <CategoryPill key={t} value={t} active={category===t} onClick={()=>setCategory(t)} />
            ))}
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search name, brand, flavor"
              className="w-full md:w-96 px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(p => (
            <li key={p.id} className="group">
              <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-lg">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="h-48 w-full object-cover" loading="lazy" />
                  <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-gray-800 text-white border border-gray-600">{p.category}</div>
                  {p.stock === 0 && (
                    <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-red-500 text-white">Out of stock</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold leading-tight text-gray-900">{p.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{p.brand} • {p.flavor}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Rating value={p.rating} />
                    <span className="text-xs text-gray-600">{p.servings} servings</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">${p.price.toFixed(2)}</span>
                    <button
                      disabled={p.stock===0}
                      onClick={()=>alert(`Added ${p.name} to cart`)}
                      className="px-3 py-2 text-sm rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 hover:bg-emerald-200 disabled:opacity-50"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {list.length === 0 && (
          <div className="text-center text-gray-500 mt-16">No products match your filters.</div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">30 products</div>
      </div>
    </div>
   </Layout>
  );
}
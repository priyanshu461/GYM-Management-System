import React, { useState } from "react"
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
const products = [
  // PRE 1-10
  { id: 1, name: "Nitro Surge Pre", category: "Pre", brand: "Volt Labs", price: 29.99, flavor: "Blue Raspberry", servings: 30, rating: 4.5, stock: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0XApBokz86IYVxbTnAn8gEy4Ruxocaihpg" },
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


export default function PreIntraPostWorkout() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
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
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-teal-600'
        }`}>
          Pre, Intra & Post Workout Supplements
        </h1>
        <p className={`mt-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
        }`}>
          Explore our premium selection of pre, intra, and post workout supplements for your fitness goals.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex gap-3 flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className={`flex-1 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-100 border-slate-300'
            } border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className={`${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-slate-100 border-slate-300'
            } border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500`}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Pre</option>
            <option>Intra</option>
            <option>Post</option>
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
            className={`${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                : 'bg-gradient-to-br from-teal-50 to-teal-100 border-slate-200'
            } rounded-2xl border overflow-hidden shadow-lg hover:shadow-teal-900/20 hover:scale-105 transition transform`}
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
                  <h3 className={`font-bold text-lg truncate ${
                    theme === 'dark' ? 'text-white' : 'text-teal-600'
                  }`}>{product.name}</h3>
                  <span className="text-sm text-amber-400">★ {product.rating}</span>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                }`}>{product.brand} • {product.flavor}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className={`text-xl font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>${product.price.toFixed(2)}</div>
                <div className="flex gap-2">
                  <button className="bg-teal-600 hover:bg-teal-500 text-sm px-3 py-1 rounded-lg font-semibold transition">
                    Add
                  </button>
                  <button className={`${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-slate-200 hover:bg-slate-300'
                  } text-sm px-3 py-1 rounded-lg transition`}>
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

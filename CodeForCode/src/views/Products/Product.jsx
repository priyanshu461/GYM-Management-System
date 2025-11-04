import React, { useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from 'react-router-dom';

export const PRODUCTS = [
  // Protein 1-10
  { id: 1, name: "Whey Protein Isolate", category: "Protein", brand: "Volt Labs", price: 3299, flavor: "Vanilla", servings: 30, rating: 4.5, stock: 25, image: "https://m.media-amazon.com/images/I/61j1JiaFLlL._SY450_.jpg" },
  { id: 2, name: "Mass Gainer Pro", category: "Protein", brand: "PrimeForce", price: 4149, flavor: "Chocolate", servings: 25, rating: 4.2, stock: 18, image: "https://m.media-amazon.com/images/I/61DQLVMdwsL._SX679_.jpg" },
  { id: 3, name: "Vegan Protein Blend", category: "Protein", brand: "CoreFuel", price: 3734, flavor: "Strawberry", servings: 30, rating: 4.4, stock: 22, image: "https://nutrabox.in/cdn/shop/files/Vegan_Banner_M.jpg?crop=center&height=1200&v=1748589953&width=1200" },
  { id: 4, name: "Casein Protein", category: "Protein", brand: "IronWorks", price: 3569, flavor: "Cookies & Cream", servings: 28, rating: 4.6, stock: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZNCQ3DXLPzV5opN9WZjKvKLIMoY48taB2g&s" },
  { id: 5, name: "Hydrolyzed Whey", category: "Protein", brand: "Lift Co.", price: 4397, flavor: "Banana", servings: 30, rating: 4.8, stock: 12, image: "https://images-cdn.ubuy.co.in/678c657ddd32e911176e3409-optimum-nutrition-platinum-hydrowhey.jpg" },
  { id: 6, name: "Protein Energy Bar", category: "Protein", brand: "AthletiX", price: 2489, flavor: "Mixed", servings: 12, rating: 4.0, stock: 30, image: "https://proathlix.com/cdn/shop/files/2NewProteinBarSlides.png?v=1755581600&width=720" },
  { id: 7, name: "Lean Protein Powder", category: "Protein", brand: "PeakLab", price: 3153, flavor: "Vanilla Bean", servings: 25, rating: 4.3, stock: 20, image: "https://bootynbuffstore.com/cdn/shop/files/BootyNBuffLeanProtein28Serves_1kg_CaramelisedBananaV3-BootyNBuff.png?v=1719024338&width=1080" },
  { id: 8, name: "Anabolic Whey", category: "Protein", brand: "Rival Sports", price: 3817, flavor: "Chocolate Peanut", servings: 26, rating: 4.4, stock: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIkE3zEU5x9PjQybt8WaFSZK0177fkyR62FuOsRuryHonaqaV6LPK-gJ87RmckjFKSaM&usqp=CAU" },
  { id: 9, name: "Ultra ISO Whey", category: "Protein", brand: "Vector", price: 4647, flavor: "Salted Caramel", servings: 30, rating: 4.9, stock: 5, image: "https://dymatize.imgix.net/production/products/DYMA_PDP_ISO100_SaltedCaramel_FB_HEADER_DESKTOP_2025-06-13-203229_qvfd.jpg?ar=3840%3A2156&auto=format%2Ccompress&fit=crop&ixlib=php-3.1.0&w=2600" },
  { id: 10, name: "Regen Protein", category: "Protein", brand: "HexaFit", price: 3483, flavor: "Chocolate Fudge", servings: 27, rating: 4.5, stock: 14, image: "https://m.media-amazon.com/images/I/71oNpPrP8PL._SX679_.jpg" },

  // Amino Acids 11-20
  { id: 11, name: "BCAA Recovery Fuel", category: "Amino Acids", brand: "Volt Labs", price: 2074, flavor: "Fruit Punch", servings: 30, rating: 4.3, stock: 20, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSypNEfAvIC1EUqM47UGCnYVCypP7-sVJxvY0NtFxd2Ng05FgJUwCzuLZQU5gGWj0-bTLAxWzOsUto7E200xaUipKPc1uKwTHjq6teU9cJMeVnFVTVx_IYUG9dc9doQQpVi3cYSxw&usqp=CAc" },
  { id: 12, name: "EAA Energy Blend", category: "Amino Acids", brand: "PrimeForce", price: 2489, flavor: "Peach", servings: 30, rating: 4.4, stock: 18, image: "https://files.ekmcdn.com/2ab763/images/optimum-nutrition-eaa-energy-432g-1078-p.jpg" },
  { id: 13, name: "Amino Rush", category: "Amino Acids", brand: "CoreFuel", price: 2241, flavor: "Blue Ice", servings: 30, rating: 4.1, stock: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRT74iyAMsW1OvuvHZpt-_NwslgNtea7nPnpwcIxz-tzf6DxaufZ2QQEYaHZCjtEWAmcQ&usqp=CAU" },
  { id: 14, name: "Hydra BCAA", category: "Amino Acids", brand: "IronWorks", price: 1909, flavor: "Lemon Ice", servings: 30, rating: 4.2, stock: 25, image: "https://www.muscleandstrength.in/cdn/shop/products/61b5jVEjVUL._SL1000.jpg?v=1705733365&width=416" },
  { id: 15, name: "IsoCharge EAA", category: "Amino Acids", brand: "Lift Co.", price: 2364, flavor: "Tropical", servings: 25, rating: 4.5, stock: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5U-PKQY1enCtdu1r9P8FL5GzBgI54XmlHnHXeLgJZjfb36oaHbod6ORFpGGwXMb095s&usqp=CAU" },
  { id: 16, name: "Refuel Pro", category: "Amino Acids", brand: "AthletiX", price: 1992, flavor: "Raspberry", servings: 30, rating: 4.0, stock: 17, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCdAGGCNNegrai2l_ZHQfJrzV5mewuC28jZb2qCIUgTn3gFZQdEpNPSLKVtpYU19C_zo&usqp=CAU" },
  { id: 17, name: "HydroMix BCAA", category: "Amino Acids", brand: "PeakLab", price: 1834, flavor: "Citrus", servings: 30, rating: 3.9, stock: 22, image: "https://images-eu.ssl-images-amazon.com/images/I/71zv7OmUwwL._AC_UL210_SR210,210_.jpg" },
  { id: 18, name: "Amino Stream", category: "Amino Acids", brand: "Rival Sports", price: 2207, flavor: "Grape Ice", servings: 30, rating: 4.2, stock: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBq6hlJPZsA_e45T6DBMrDfs3LALNkbGyimEJKlsAl5yKpyzkA7oRvORBi5bRRh1TZVa0&usqp=CAU" },
  { id: 19, name: "Endure Mix", category: "Amino Acids", brand: "Vector", price: 2161, flavor: "Coconut", servings: 25, rating: 4.0, stock: 14, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnaGksUB4kFZgkhBaqFLE6fkJgjLX_0Zkhw&s" },
  { id: 20, name: "Train Sustain", category: "Amino Acids", brand: "HexaFit", price: 2318, flavor: "Lime", servings: 30, rating: 4.3, stock: 11, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGAIj1YCGTp9NSHRZ8I8zEaWUHwEDxRK78rVa8dW2U_f6L4buOSNX0_cA0RoBFW6rXdU&usqp=CAU" },

  // Pre Workout 21-30
  { id: 21, name: "Nitro Surge Pre", category: "Pre Workout", brand: "Volt Labs", price: 2489, flavor: "Blue Raspberry", servings: 30, rating: 4.5, stock: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0XApBokz86IYVxbTnAn8gEy4Ruxocaihpg&s" },
  { id: 22, name: "Alpha Ignite", category: "Pre Workout", brand: "PrimeForce", price: 2897, flavor: "Watermelon", servings: 25, rating: 4.2, stock: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzxhazn4OmB6V_-syCM3K7kSBCoN1jz7twQ&s" },
  { id: 23, name: "Pulse Max", category: "Pre Workout", brand: "CoreFuel", price: 3319, flavor: "Fruit Punch", servings: 20, rating: 4.1, stock: 0, image: "https://5.imimg.com/data5/SELLER/Default/2023/12/372275485/IU/HO/WS/94540127/300g-muscle-max-fruit-punch-pre-workout-supplement.jpg" },
  { id: 24, name: "Storm Pre", category: "Pre Workout", brand: "IronWorks", price: 2284, flavor: "Mango", servings: 30, rating: 4.0, stock: 14, image: "https://cdn.shopify.com/s/files/1/0301/5737/3576/files/stormmaker-peachmango1.png?v=1660285967" },
  { id: 25, name: "Rocket Fuel", category: "Pre Workout", brand: "Lift Co.", price: 2737, flavor: "Lemon Lime", servings: 30, rating: 4.7, stock: 33, image: "https://m.media-amazon.com/images/I/61xP47mio7L._UF1000,1000_QL80_.jpg" },
  { id: 26, name: "Charge V2", category: "Pre Workout", brand: "AthletiX", price: 2947, flavor: "Pineapple", servings: 25, rating: 4.3, stock: 6, image: "https://healthfarmnutrition.com/cdn/shop/files/nb_cell_pineapple_3.jpg?v=1744877080&width=1500" },
  { id: 27, name: "Lift Off", category: "Pre Workout", brand: "PeakLab", price: 2318, flavor: "Green Apple", servings: 30, rating: 3.9, stock: 21, image: "https://5.imimg.com/data5/SELLER/Default/2023/3/292577503/JH/RD/ZD/119857853/post-workouts-500x500.jpg" },
  { id: 28, name: "Thunderbolt", category: "Pre Workout", brand: "Rival Sports", price: 2627, flavor: "Grape", servings: 30, rating: 4.4, stock: 19, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjEEH21zJDWUysUTTXiwMFYS5kM-1unjkkvi7VH0GJDsJfpnrHCf2s2tK5YxU8HMpVYI&usqp=CAU" },
  { id: 29, name: "Edge Pre", category: "Pre Workout", brand: "Vector", price: 2364, flavor: "Orange", servings: 20, rating: 4.0, stock: 12, image: "https://m.media-amazon.com/images/I/41UNk5vORcL.jpg_BO30,255,255,255_UF800,800_SR1910,1000,0,C_PIin-overlay-frame,TopLeft,0,0_QL100_.jpg" },
  { id: 30, name: "Beta Burst", category: "Pre Workout", brand: "HexaFit", price: 2817, flavor: "Berry Blast", servings: 25, rating: 4.6, stock: 8, image: "https://m.media-amazon.com/images/I/61NgfK+FHKL._UF350,350_QL80_.jpg" },

  // Intra Workout 31-40
  { id: 31, name: "Hydra BCAA Intra", category: "Intra Workout", brand: "Volt Labs", price: 2074, flavor: "Lemon Ice", servings: 30, rating: 4.2, stock: 15, image: "https://www.muscleandstrength.in/cdn/shop/products/61b5jVEjVUL._SL1000.jpg?v=1705733365&width=416" },
  { id: 32, name: "Flow EAA Intra", category: "Intra Workout", brand: "PrimeForce", price: 2489, flavor: "Peach", servings: 30, rating: 4.4, stock: 25, image: "https://files.ekmcdn.com/2ab763/images/optimum-nutrition-eaa-energy-432g-1078-p.jpg" },
  { id: 33, name: "Endure Mix Intra", category: "Intra Workout", brand: "CoreFuel", price: 1867, flavor: "Coconut", servings: 25, rating: 4.0, stock: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnaGksUB4kFZgkhBaqFLE6fkJgjLX_0Zkhw&s" },
  { id: 34, name: "Amino Rush Intra", category: "Intra Workout", brand: "IronWorks", price: 2241, flavor: "Blue Ice", servings: 30, rating: 4.1, stock: 17, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRT74iyAMsW1OvuvHZpt-_NwslgNtea7nPnpwcIxz-tzf6DxaufZ2QQEYaHZCjtEWAmcQ&usqp=CAU" },
  { id: 35, name: "Train Sustain Intra", category: "Intra Workout", brand: "Lift Co.", price: 2318, flavor: "Lime", servings: 30, rating: 4.3, stock: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGAIj1YCGTp9NSHRZ8I8zEaWUHwEDxRK78rVa8dW2U_f6L4buOSNX0_cA0RoBFW6rXdU&usqp=CAU" },
  { id: 36, name: "Motion Fuel Intra", category: "Intra Workout", brand: "AthletiX", price: 2161, flavor: "Wild Cherry", servings: 30, rating: 3.8, stock: 11, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcrCSUxxcv1MyOnLAMj6eEf4UGh8sqnBn5w&s" },
  { id: 37, name: "IsoCharge EAA Intra", category: "Intra Workout", brand: "PeakLab", price: 2364, flavor: "Tropical", servings: 25, rating: 4.5, stock: 14, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5U-PKQY1enCtdu1r9P8FL5GzBgI54XmlHnHXeLgJZjfb36oaHbod6ORFpGGwXMb095s&usqp=CAU" },
  { id: 38, name: "Refuel Pro Intra", category: "Intra Workout", brand: "Rival Sports", price: 1955, flavor: "Raspberry", servings: 30, rating: 4.0, stock: 9, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCdAGGCNNegrai2l_ZHQfJrzV5mewuC28jZb2qCIUgTn3gFZQdEpNPSLKVtpYU19C_zo&usqp=CAU" },
  { id: 39, name: "HydroMix BCAA Intra", category: "Intra Workout", brand: "Vector", price: 1834, flavor: "Citrus", servings: 30, rating: 3.9, stock: 13, image: "https://images-eu.ssl-images-amazon.com/images/I/71zv7OmUwwL._AC_UL210_SR210,210_.jpg" },
  { id: 40, name: "Amino Stream Intra", category: "Intra Workout", brand: "HexaFit", price: 2207, flavor: "Grape Ice", servings: 30, rating: 4.2, stock: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBq6hlJPZsA_e45T6DBMrDfs3LALNkbGyimEJKlsAl5yKpyzkA7oRvORBi5bRRh1TZVa0&usqp=CAU" },

  // Post Workout 41-50
  { id: 41, name: "Iso Whey 100 Post", category: "Post Workout", brand: "Volt Labs", price: 4149, flavor: "Vanilla", servings: 30, rating: 4.6, stock: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGm43yFXwSBe2WFjGd1AJlFhBZKpU4a_aqr6qI0RfKwMLaCnOv-G_VpkN-enVQtCt-jY&usqp=CAU" },
  { id: 42, name: "Rebuild Whey Post", category: "Post Workout", brand: "PrimeForce", price: 3734, flavor: "Chocolate", servings: 27, rating: 4.4, stock: 28, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPDCQX7xj6o0qp8fLnfR-Gtkr3x93Jul8l6lBzVU0cYlQGqISdXp-OpV9onIx2VperrUQ&usqp=CAU" },
  { id: 43, name: "Recover Matrix Post", category: "Post Workout", brand: "CoreFuel", price: 3867, flavor: "Strawberry", servings: 25, rating: 4.1, stock: 18, image: "https://images-na.ssl-images-amazon.com/images/I/81+cEMZJdtL._AC_UL600_SR600,600_.jpg" },
  { id: 44, name: "Regen Blend Post", category: "Post Workout", brand: "IronWorks", price: 3569, flavor: "Cookies & Cream", servings: 30, rating: 4.2, stock: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMngGeym9ktDa8M-BOmpnKY8GBB3DRo8yVVQ&s" },
  { id: 45, name: "Lean Build Post", category: "Post Workout", brand: "Lift Co.", price: 3319, flavor: "Banana", servings: 24, rating: 3.9, stock: 16, image: "https://bootynbuffstore.com/cdn/shop/files/BootyNBuffLeanProtein28Serves_1kg_CaramelisedBananaV3-BootyNBuff.png?v=1719024338&width=1080" },
  { id: 46, name: "Whey Prime Post", category: "Post Workout", brand: "AthletiX", price: 3781, flavor: "Mocha", servings: 28, rating: 4.5, stock: 7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLUHfefm29T5njn7UDrV-ALaZKcjH7xfXMLFj5SSKq0VpCmmn6-PMxMJD8QWSWbSJvpg&usqp=CAU" },
  { id: 47, name: "Ultra ISO Post", category: "Post Workout", brand: "PeakLab", price: 4397, flavor: "Salted Caramel", servings: 30, rating: 4.8, stock: 0, image: "https://dymatize.imgix.net/production/products/DYMA_PDP_ISO100_SaltedCaramel_FB_HEADER_DESKTOP_2025-06-13-203229_qvfd.jpg?ar=3840%3A2156&auto=format%2Ccompress&fit=crop&ixlib=php-3.1.0&w=2600" },
  { id: 48, name: "Anabolic Repair Post", category: "Post Workout", brand: "Rival Sports", price: 3615, flavor: "Chocolate Peanut", servings: 26, rating: 4.3, stock: 23, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIkE3zEU5x9PjQybt8WaFSZK0177fkyR62FuOsRuryHonaqaV6LPK-gJ87RmckjFKSaM&usqp=CAU" },
  { id: 49, name: "Protein 360 Post", category: "Post Workout", brand: "Vector", price: 3483, flavor: "Vanilla Bean", servings: 30, rating: 4.0, stock: 19, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6cLksauynaKrDb3D8ncY4vR3d_ZN6Ma0cyCkJh8plRgvmD7ShimdAPaWxcfZCxBJTqk&usqp=CAU" },
  { id: 50, name: "Regen Pro Post", category: "Post Workout", brand: "HexaFit", price: 3919, flavor: "Chocolate Fudge", servings: 27, rating: 4.6, stock: 15, image: "https://m.media-amazon.com/images/I/71oNpPrP8PL._SX679_.jpg" },

  // Multivitamin 51-60
  { id: 51, name: "Men's Performance Multivitamin", category: "Multivitamin", brand: "Volt Labs", price: 699, flavor: "Tablets", servings: 30, rating: 4.6, stock: 40, image: "https://www.garagegymreviews.com/wp-content/uploads/2024/10/perfoemance-lab-nutrigenesis-men-bottle-and-capsules.jpg" },
  { id: 52, name: "Women's Immunity Booster", category: "Multivitamin", brand: "PrimeForce", price: 799, flavor: "Capsules", servings: 45, rating: 4.8, stock: 35, image: "https://onemg.gumlet.io/l_watermark_346,w_690,h_700/a_ignore,w_690,h_700,c_pad,q_auto,f_auto/pgkk25vpxlu8ehf6yotb.jpg" },
  { id: 53, name: "Unisex Daily Multivitamin", category: "Multivitamin", brand: "CoreFuel", price: 599, flavor: "Tablets", servings: 60, rating: 4.5, stock: 28, image: "https://m.media-amazon.com/images/I/71b9NZfGewL._UF1000,1000_QL80_.jpg" },
  { id: 54, name: "Immunity Shield Complex", category: "Multivitamin", brand: "IronWorks", price: 749, flavor: "Gummies", servings: 30, rating: 4.7, stock: 32, image: "https://m.media-amazon.com/images/I/6139SmDT+TL._UF1000,1000_QL80_.jpg" },
  { id: 55, name: "Performance Max Multivitamin", category: "Multivitamin", brand: "Lift Co.", price: 999, flavor: "Powder", servings: 30, rating: 4.9, stock: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1wW1oT4SJfQWvIWNPvUrEadRkPZV1SIL0A&s" },
  { id: 56, name: "Men's Daily Health Boost", category: "Multivitamin", brand: "AthletiX", price: 549, flavor: "Capsules", servings: 30, rating: 4.3, stock: 30, image: "https://5.imimg.com/data5/SELLER/Default/2025/1/481119866/CW/KW/KD/32319264/men-booster-capsule.jpg" },
  { id: 57, name: "Women's Energy Multivitamin", category: "Multivitamin", brand: "PeakLab", price: 749, flavor: "Tablets", servings: 60, rating: 4.7, stock: 27, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1LLIh6SiNfS8LrMHaP2Gbn-00n6n2c-u5w&s" },
  { id: 58, name: "Unisex Active Formula", category: "Multivitamin", brand: "Rival Sports", price: 799, flavor: "Powder", servings: 45, rating: 4.6, stock: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0JhbUO223Vf-98OjMpdkVqTMYuHFTXUy3g&s" },
  { id: 59, name: "Immunity+ Gummies", category: "Multivitamin", brand: "Vector", price: 699, flavor: "Gummies", servings: 30, rating: 4.4, stock: 29, image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/4fb8401ead2e43c9b930ca5cf1b1cb91.jpg?dpr=3&format=auto" },
  { id: 60, name: "Performance X Pro Mix", category: "Multivitamin", brand: "HexaFit", price: 1199, flavor: "Powder", servings: 60, rating: 4.9, stock: 24, image: "https://m.media-amazon.com/images/I/71XcJmeXZpL._UF350,350_QL80_.jpg" },
];

const CategoryPill = ({ value, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
      active ? "bg-teal-100 text-teal-800 border-teal-300" : "bg-teal-50 text-teal-600 border-teal-200 hover:border-teal-300"
    }`}
  >
    {value}
  </button>
);

const Rating = ({ value }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = new Array(5).fill(0).map((_, i) => {
    if (i < full) return "Γÿà";
    if (i === full && half) return "Γÿå";
    return "Γÿå";
  });
  return <span className="text-yellow-400 text-sm" aria-label={`Rated ${value}`}>{stars.join(" ")}</span>;
};

const placeholderImage = "https://via.placeholder.com/300x192?text=Image+Not+Available";

export default function Product() {
  const { theme, toggleHighContrast } = useTheme();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

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
    protein: PRODUCTS.filter(p=>p.category==='Protein').length,
    aminoAcids: PRODUCTS.filter(p=>p.category==='Amino Acids').length,
    preWorkout: PRODUCTS.filter(p=>p.category==='Pre Workout').length,
    intraWorkout: PRODUCTS.filter(p=>p.category==='Intra Workout').length,
    postWorkout: PRODUCTS.filter(p=>p.category==='Post Workout').length,
    multivitamin: PRODUCTS.filter(p=>p.category==='Multivitamin').length,
    oos: PRODUCTS.filter(p=>p.stock===0).length,
  }), []);

  return (
    <Layout>
      <div className={`min-h-screen ${theme === "dark" ? "bg-teal-900 text-white" : "bg-white text-gray-900"}`}>
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-200">Fitness Supplements</h1>
              <p className={`text-gray-600 dark:text-gray-300 text-sm mt-1 font-medium`}>Protein, Amino Acids, Pre, Intra, Post workout, and Multivitamin supplements</p>
            </div>
            <div className="flex gap-2">
              <Link to="/products/create">
                <button className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors">Create Product</button>
              </Link>
              <button onClick={toggleHighContrast} className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm hover:bg-teal-200">High contrast</button>
              <select
                value={sort}
                onChange={(e)=>setSort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="stock">Stock: High to Low</option>
              </select>
              <button onClick={()=>window.print()} className="px-3 py-2 rounded-lg bg-teal-100 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm hover:bg-teal-200">Export</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Total</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.total}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Protein</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.protein}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Amino Acids</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.aminoAcids}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Pre Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.preWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Intra Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.intraWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Post Workout</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.postWorkout}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Multivitamin</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.multivitamin}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 dark:bg-teal-900 border border-teal-200 p-4">
              <p className="text-teal-600 dark:text-teal-300 text-sm font-medium">Out of Stock</p>
              <p className="text-2xl font-bold mt-1 text-teal-900 dark:text-white">{counts.oos}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              {['All','Protein','Amino Acids','Pre Workout','Intra Workout','Post Workout','Multivitamin'].map(t => (
                <CategoryPill key={t} value={t} active={category===t} onClick={()=>setCategory(t)} />
              ))}
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search name, brand, flavor"
                className="w-full md:w-96 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-900 border border-teal-300 text-teal-800 dark:text-white text-sm placeholder:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map(p => (
              <li key={p.id} className="group">
                <div className="rounded-2xl overflow-hidden bg-teal-50 dark:bg-teal-900 border border-teal-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="relative">
                    <img src={p.image} alt={p.name} className="h-48 w-full object-cover" loading="lazy" onError={(e) => e.target.src = placeholderImage} />
                    <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-gray-800 text-white border border-gray-600">{p.category}</div>
                    {p.stock === 0 && (
                      <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-red-500 text-white">Out of stock</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold leading-tight text-gray-900 dark:text-white">{p.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{p.brand} ΓÇó {p.flavor}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Rating value={p.rating} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{p.servings} servings</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">${p.price}</span>
                      <button
                        disabled={p.stock===0}
                        onClick={()=>addToCart(p)}
                        className="px-3 py-2 text-sm rounded-lg bg-emerald-100 dark:bg-teal-900 border border-emerald-300 text-emerald-800 dark:text-white hover:bg-emerald-200 dark:hover:bg-teal-800 disabled:opacity-50"
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

          {/* Cart Section */}
          {cart.length > 0 && (
            <div className="mt-12 bg-teal-50 dark:bg-teal-900 rounded-2xl p-6 border border-teal-200">
              <h2 className="text-2xl font-bold text-teal-900 dark:text-white mb-6">Shopping Cart</h2>
              <div className="space-y-4">
                {cart.map(item => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-teal-800 rounded-xl border border-teal-200">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" onError={(e) => e.target.src = placeholderImage} />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.brand} ΓÇó ${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-white hover:bg-teal-200 dark:hover:bg-teal-600 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-white hover:bg-teal-200 dark:hover:bg-teal-600 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white w-20 text-right">${itemTotal}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 flex items-center justify-center"
                        >
                          ├ù
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* GST Calculation */}
              <div className="mt-6 border-t border-teal-200 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal:</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>CGST (5%):</span>
                    <span>${Math.round(cartTotal * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>SGST (5%):</span>
                    <span>${Math.round(cartTotal * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-teal-900 dark:text-white border-t border-teal-300 pt-2">
                    <span>Total:</span>
                    <span>${cartTotal + Math.round(cartTotal * 0.05) + Math.round(cartTotal * 0.05)}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-xs text-gray-500">50 products</div>
        </div>
      </div>


    </Layout>
  );
}

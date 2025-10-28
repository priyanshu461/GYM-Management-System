import React from 'react'

const Services = async () => {
       
      

        // Fetch top products
        const productsResponse = await fetch(`${BASE_API_URL}dashboard/top-products`);
        if (!productsResponse.ok) throw new Error('Failed to fetch top products');
        const productsData = await productsResponse.json();
        setTopProducts(productsData);

        // Fetch recent orders
        const ordersResponse = await fetch(`${BASE_API_URL}dashboard/recent-orders`);
        if (!ordersResponse.ok) throw new Error('Failed to fetch recent orders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
  return (
    <div>
     
    </div>
  )
}

export default Services
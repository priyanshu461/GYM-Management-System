import React from 'react'
import { BASE_API_URL } from '../Utils/data';

const FetchStats = async() => {
      // Fetch stats
        const statsResponse = await fetch(`${BASE_API_URL}dashboard/stats`, {headers: {'Authorization': `Bearer ${TOKEN}`}});
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsResponse.json();
        setStats(statsData);

  return (
    <div>
      
    </div>
  )
}

export default FetchStats
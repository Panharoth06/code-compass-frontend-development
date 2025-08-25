'use client'

import { useGetProblemQuery } from '@/lib/services/problem/problem';
import React from 'react'

const ProblemDisplay = () => {

    const {data, error, isLoading} = useGetProblemQuery("1");

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;
    if (!data) return <div>No data found</div>;

  return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
}

export default ProblemDisplay
'use client'

import { useGetSubmissionQuery } from '@/lib/services/problem/problem';
import React from 'react'

const ProblemDisplay = () => {

    const {data, error, isLoading} = useGetSubmissionQuery("1");

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {(error as any).status}</div>;
    if (!data) return <div>No data found</div>;

  return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
}

export default ProblemDisplay
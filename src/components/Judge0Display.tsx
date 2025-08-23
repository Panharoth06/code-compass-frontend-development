'use client'

import { useGetSubmissionQuery } from '@/lib/services/judge0/judge0';

const Judge0Display = () => {
    const {data, error, isLoading} = useGetSubmissionQuery("543ffd69-6b90-4f74-ae89-34cd64524d3b");

    if (isLoading) {
      return <p>Loading...</p>;
    } 
    
    if (error) {
      return <p>Error occurred: {JSON.stringify(error)}</p>;
    } 
    
    if (!data) {
      return <p>No data available.</p>;
    } 

  return (
    <p> {JSON.stringify(data)} </p>
  )
}

export default Judge0Display
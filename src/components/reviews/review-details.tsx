import React from 'react'

export default function ReviewDetails({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <div>
      <h1 className="text-2xl font-bold">Review Details {id}</h1>
      <p className="text-gray-600">Here you can find the details of the review.</p>
    </div>
  )
}

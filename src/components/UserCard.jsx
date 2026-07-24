import React from 'react'

const UserCard = ({user}) => {
    
  return (
    <div className="card w-96 bg-base-300 shadow-sm mx-auto overflow-hidden my-10">
  <figure className="w-full h-80">
    <img
      src={user.photourl}
      alt="user photo"
      className="w-full h-full object-cover"
    />
  </figure>

  <div className="card-body p-5 space-y-3">
    <h2 className="card-title text-center justify-center">
      {user.firstname + " " + user.lastname}
    </h2>

    {user.age && user.gender && (
      <p className="text-center">
        {user.age + " " + user.gender}
      </p>
    )}

    <p className="text-center">{user.about}</p>

    <div className="card-actions justify-center gap-4 mt-4">
      <button className="btn btn-primary px-6">
        Ignore
      </button>
      <button className="btn btn-secondary px-6">
        Interested
      </button>
    </div>
  </div>
</div>
  )
}

export default UserCard

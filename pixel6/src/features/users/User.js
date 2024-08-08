// src/features/users/User.js
import React from 'react';

const User = ({ user }) => {
  return (
    <div className="user">
      <p>ID: {user.id}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Country: {user.address.country}</p>
      <p>Job Title: {user.company?.title || 'N/A'}</p>
    </div>
  );
};

export default User;

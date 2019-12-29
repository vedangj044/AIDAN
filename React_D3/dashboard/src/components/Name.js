import React from 'react'

// Props are passed down like normal function args
// Destructure `names` from the props object
export default function Name({ name }) {
  return <div>My name is: {name}</div>;
}
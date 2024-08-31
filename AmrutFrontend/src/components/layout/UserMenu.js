import React from 'react'
import { Link } from 'react-router-dom'
const UserMenu = () => {
  return (
    <div>
       <div className="text-center">
      <div className="list-group">
        <h2> Dashboard</h2>
        <Link to="/dash/user/profile" className="list-group-item list-group-item-action">
  Profile
</Link>
<Link to="/dash/user/order" className="list-group-item list-group-item-action">
  orders
</Link>
{/* <Link to="/dash/admin/user" className="list-group-item list-group-item-action">
  Users
</Link> */}

      </div>
    </div>
    </div>
  )
}

export default UserMenu

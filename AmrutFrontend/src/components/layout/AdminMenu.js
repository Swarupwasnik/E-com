import React from "react";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h2>Admin Dashboard</h2>
        <Link to="/dash/admin/create-category" className="list-group-item list-group-item-action">
  Create Category
</Link>
<Link to="/dash/admin/create-product" className="list-group-item list-group-item-action">
  Create Product
</Link>
<Link to="/dash/admin/products" className="list-group-item list-group-item-action">
  Product
</Link>

<Link to="/dash/admin/user" className="list-group-item list-group-item-action">
  Users
</Link> 
<Link to="/dash/admin/orders" className="list-group-item list-group-item-action">
  Orders
</Link>

      </div>
    </div>
  );
};

export default AdminMenu;

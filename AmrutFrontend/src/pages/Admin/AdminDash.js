import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDash = () => {
  const[auth] = useAuth()
  return (
    <Layout>

<div className="container single_product_container">
      <div className="row">
            <div className="col">
              {/* <!-- Breadcrumbs --> */}

              <div className="breadcrumbs d-flex flex-row align-items-center">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/shop">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      Blog
                    </a>
                  </li>
                  <li className="active">
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                      All Blog Page
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

     <div className='container-fluid m-3 p-3'>

<div className='row'>
<div className='col-md-3'>
<AdminMenu/>

</div>
<div className='col-md-9'>
<div className='card w-75 p-3'>
<h5> Admin Name: <span className="text-primary">{auth ?.user?.name}</span></h5>
<h5> Admin Email: <span className="text-primary">{auth ?.user?.email}</span></h5>
<h5> Admin Contact:<span className="text-primary">{auth ?.user?.phone}</span></h5>




</div>
</div>


</div>
     </div>
     </div>
    </Layout>
  )
}

export default AdminDash


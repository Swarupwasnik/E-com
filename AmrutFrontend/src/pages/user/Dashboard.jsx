import React from 'react'
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/layout/UserMenu';
const Dashboard = () => {
  const[auth] = useAuth()
  return (
    <Layout title={"User-Amrut Food Services"}>

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
                    Shop
                  </a>
                </li>
                <li className="active">
                  <a href="#">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    Cartpage
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
<div className='container-fluid m-3 p-3'>
<div className='col-md-3'>
  <UserMenu/>
</div>
<div className='col-md-9'>
  <div className='card w-50 p-3'>
<h6 className="text-primary">Username:<span className='text-secondary'>{auth?.user?.name}</span></h6>
<h6 className="text-primary" >Useremail:<span className='text-secondary'>{auth?.user?.email}</span></h6>
<h6 className="text-primary">Useraddress:<span className='text-secondary'>{auth?.user?.address}</span></h6>

  </div>
</div>

</div>
       </div>
    </Layout>
  )
}

export default Dashboard


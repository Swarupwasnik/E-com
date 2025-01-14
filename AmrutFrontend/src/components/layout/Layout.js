import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,author,keywords}) => {
  return (
    
<div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author} />

                <title>{title}</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
          
        


    <Header/>
    <main style={{minHeight:"70vh"}}>
<Toaster/>
        {children}
    </main>
    <Footer/>
    </div>
  )
}

Layout.defaultProps ={
  title:"Amrut Food Services",
  Description:"",
  keywords:"Amrut,Raw Chips, Verimoli",
  author:"Amrut Food Services"

}
export default Layout
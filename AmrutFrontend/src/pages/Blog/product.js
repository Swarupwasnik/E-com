<div class="wrapper" key={item._id}>
  <div class="container">
    <div
      class="top"
      style={{
        backgroundImage: `url(http://localhost:8080/api/v1/product/product-photo/${item._id})`,
      }}
    ></div>
    <div class="bottom">
      <div class="left">
        <div class="details">
          <h1>{item.name}</h1>
          <p>${item.price}</p>
        </div>
        <div class="buy">
          {" "}
          <a>
            <i
              onClick={() => {
                setCart([...cart, item]);
                toast.success("item Added to Cart");
              }}
              class="material-icons"
            >
              add_shopping_cart
            </i>
          </a>
        </div>
      </div>
      <div class="right">
        <div class="done">
          <i class="material-icons">done</i>
        </div>
        <div class="details">
          <h1>Chair</h1>
          <p>Added to your cart</p>
        </div>
        <div class="remove">
          <i class="material-icons">clear</i>
        </div>
      </div>
    </div>
  </div>
  <div class="inside">
    <div class="icon">
      <a onClick={() => navigate(`/productdetail/${item.slug}`)}>
        <i class="material-icons">info_outline</i>
      </a>
    </div>
  </div>
</div>;

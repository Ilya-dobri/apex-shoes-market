import React from 'react'

const Catalog = ({ product }: any) => {
  return (
    <div>
      {product.map((item: any) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.price}$</p>
        </div>
      ))}
    </div>
  );
};
export default Catalog

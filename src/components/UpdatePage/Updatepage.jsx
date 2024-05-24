import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductUpdate = ({ onClose }) => {
  const [srno, setsrno] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('productsrno', srno);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', parseFloat(price));
      formData.append('quantity', parseFloat(quantity));
      formData.append('image', image);

      const response = await axios.put(`https://grand-vivacious-lemur.glitch.me/api/products/?productsrno=${srno}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Product Updated successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(`https://grand-vivacious-lemur.glitch.me/api/products/?productsrno=${srno}`);
      const product = await response.data;

      console.log(product)
      if (product) {
        // Update state with fetched product data
        setName(product[0].name);
        setsrno(product[0].productsrno);
        setDescription(product[0].description);
        setCategory(product[0].category);
        setPrice(product[0].price);
        setQuantity(product[0].quantity);
        // You may want to handle image separately if needed
        console.log('Product data fetched:', response.data);

      } else {
        alert('Product not found');
      }
    } catch (error) {
      alert('Error fetching product data:', error);
    }

  };

  return (
    <div className="container mt-5 pt-4 mb-2">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header fs-4">Update Product</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Product SR No" value={srno} onChange={(e) => setsrno(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
                </div>
               
                <div className="text-center">
  <button type="button" className="btn btn-primary btn-block my-2" onClick={handleUpdate} style={{ fontSize: '0.9rem', width:'70%' }}>Update Product</button>
  <button type="button" className="btn btn-secondary btn-block my-2" onClick={handleFetchData} style={{ fontSize: '0.9rem', width:'70%' }}>Fetch Data</button>
</div>   
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
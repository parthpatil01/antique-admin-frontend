import React, { useState } from 'react';
import axios from 'axios';
import './Insertpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductInsert = () => {
  const [srno, setsrno] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  /* excel upload*/
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during submission

    // Check if file is selected
    if (!file) {
      setLoading(false); // Reset loading state
      alert('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/api/products/bulk-export', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Bulk Export successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };
  /* excel upload*/


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during submission

    if (!(srno && name && description && category && price && quantity)) {
      setLoading(false); // Reset loading state
      alert('Please fill all the input fields except for images.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productsrno', parseFloat(srno))
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', parseFloat(price));
      formData.append('quantity', parseFloat(quantity));
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Product Inserted successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error);

    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };


  return (
    <div className="container mt-4 mb-2">

      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header fs-4">Add Product</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Product SR No" value={srno} onChange={(e) => setsrno(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="file" className="form-control-file" accept="image/*" multiple onChange={handleImageChange} />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>

              <div className="text-center mt-3">
                <h5 className='mb-3'>Add Products in Bulk</h5>
              </div>

              <form onSubmit={handleBulkSubmit}>
                <div className="form-group">
                  <input type="file" name='file' className="form-control-file" accept=".xlsx" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload File'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductInsert;

import React, { useState } from 'react';
import BootstrapDate from '../../helpers/BootstrapDate';
import { Link } from 'react-router-dom';

const FormProduct = () => {
  const [previewImage, setPreviewImage] = useState('');

  //Preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setPreviewImage(event.target.result);
    }; 

    reader.readAsDataURL(file);
  }
  return (
    <>
      <div>
        <h2>Form Product</h2>
        <form className='card shadow-lg'>
          <div className='container px-5'>
            <img src={previewImage} className='rounded mx-auto d-block' alt='Preview' style={{ maxWidth: "300px" }}></img>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label'>Product Images</label>
              <input type='file' className='form-control' id='formFile' onChange={handleImageUpload} />
            </div>
            <div className="mb-3">
              <label htmlFor='formFile' className='form-label'>Name</label>
              <input className="form-control" type="text" aria-label="default input example" />
            </div>
            <div className="mb-3">
              <BootstrapDate></BootstrapDate>
            </div>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label'>Price</label>
              <div className='input-group'>
                <span className='input-group-text'>IDR</span>
                <input
                  type='number'
                  className='form-control'
                />
              </div>
            </div>
            <div className='row row-cols-3'>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Province</label>
                <input className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>City</label>
                <input className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Address Detail</label>
                <textarea className="form-control" type="text" aria-label="default input example"></textarea>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor='formFile' className='form-label'>Description</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className='row row-cols-2'>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Address Meeting Point</label>
                <input className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>GuideId</label>
                <input className="form-control" type="text" aria-label="default input example" />
              </div>
            </div>
            <div className="row row-cols-2 d-flex align-items-center justify-content-center mb-1">
              <Link className="btn btn-lg btn-primary" type="submit">Submit</Link>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default FormProduct
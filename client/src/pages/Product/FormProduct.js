import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addProduct } from '../../axios/productAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap"

const FormProduct = () => {
  const [previewImage, setPreviewImage] = useState('');
  const [form, setForm] = useState({
    imageProducts: [],
    name: "",
    dateStart: "",
    dateEnd: "",
    price: 0,
    province: "",
    city: "",
    addressDetail: "",
    description: "",
    addressMeetingPoint: "",
    guideId: 0
  })
  const [file, setFile] = useState(null)
  const navigation = useNavigate();

  const submitHandler = () => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("imageProducts", file)
      formData.append("name", form.name)
      formData.append("dateStart", form.dateStart)
      formData.append("dateEnd", form.dateEnd)
      formData.append("price", form.price)
      formData.append("province", form.province)
      formData.append("city", form.city)
      formData.append("addressDetail", form.addressDetail)
      formData.append("description", form.description)
      formData.append("addressMeetingPoint", form.addressMeetingPoint)
      formData.append("guideId", form.guideId)

      addProduct(formData, (status) => {
        if (status) {
          navigation('/products')
        }
      });
    } else {
      Swal.fire("Add Products", "file cannot be empty", "error");
    }
  }

  // Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  }
  // console.log(form)
  return (
    <>
      <div>
        <h2>Form Product</h2>
        <form className='card shadow-lg'>
          <div className='container px-5'>
            <img src={previewImage} className='rounded mx-auto d-block' alt='Preview' style={{ maxWidth: "300px" }}></img>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label'>Product Images: {form.imageProducts}</label>
              <input type='file' className='form-control' id='formFile' 
              onChange={(e) => {
                setFile(e.target.files[0]);
                setForm({ ...form, images: e.target.files[0].name});
                handleImageUpload(e)
              }} />
            </div>
            <div className="mb-3">
              <label htmlFor='formFile' className='form-label'>Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                type="text"
                aria-label="default input example" />
            </div>
            <div className="mb-3">
              <div className="row row-cols-2">
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="startDate" 
                    placeholder="Date of Birth" 
                    formTarget='dd-mm-yyyy' 
                    onChange={(e) => setForm({ ...form, dateStart: e.target.value })}/>
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="dob">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control 
                    type="date" 
                    name="endDate" 
                    placeholder="Date of Birth" 
                    formTarget='dd-mm-yyyy' 
                    onChange={(e) => setForm({ ...form, dateEnd: e.target.value })} />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='formFile' className='form-label'>Price</label>
              <div className='input-group'>
                <span className='input-group-text'>IDR</span>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  type='number'
                  className='form-control'
                />
              </div>
            </div>
            <div className='row row-cols-3'>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Province</label>
                <input value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>City</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Address Detail</label>
                <textarea value={form.addressDetail} onChange={(e) => setForm({ ...form, addressDetail: e.target.value })} className="form-control" type="text" aria-label="default input example"></textarea>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor='formFile' className='form-label'>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className='row row-cols-2'>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>Address Meeting Point</label>
                <input value={form.addressMeetingPoint} onChange={(e) => setForm({ ...form, addressMeetingPoint: e.target.value })} className="form-control" type="text" aria-label="default input example" />
              </div>
              <div className="mb-3">
                <label htmlFor='formFile' className='form-label'>GuideId</label>
                <input value={form.guideId} onChange={(e) => setForm({ ...form, guideId: e.target.value })} className="form-control" type="text" aria-label="default input example" />
              </div>
            </div>
            <div className="row row-cols-2 d-flex align-items-center justify-content-center mb-1">
              <Link className="btn btn-lg btn-primary" type="submit" onClick={() => submitHandler()}>Submit</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormProduct
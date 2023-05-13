import React from 'react'

const ListProduct = () => {
  return (
    <>
      <div>ListProduct</div>
      <table class="table">
        <thead>
          <tr> 
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Seen</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>123</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>123</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ListProduct
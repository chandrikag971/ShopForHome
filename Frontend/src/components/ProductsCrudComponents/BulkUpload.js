import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import toast from "react-hot-toast"

function BulkUpload() {
    const [csvFile, setCsvFile] = useState()
    const {token} = useContext(UserContext)

    const handleCsvFIleChange = (e) => {
      console.log(e.target.files[0]);
      setCsvFile(e.target.files[0]);
    }

    const uploadProducts = async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('file',csvFile);

      fetch('http://localhost:9000/admin/products/bulk-upload',
        {
          method: 'POST',
          headers:{"token": token},
          body: data
        }).then(res=>{
          toast.success("Successfully added Products")
        }).catch(err=>{
          console.log("Bulk Upload Failed")
        })
    }

  return (
    <div className="container">
      <h3 className="textHeadStyle my-3">Bulk Upload</h3>
      <form
        method="post"
        className="d-flex flex-column align-items-center"
        onSubmit={uploadProducts}
      >
        <input
          className="btn btn-outline-primary mb-3"
          type="file"
          name="file"
          id="fileInput"
          accept="*.csv"
          onChange={handleCsvFIleChange}
        />
        <button type="submit" className="btn btn-outline-primary">
          Upload Products
        </button>
      </form>
    </div>
  );
}

export default BulkUpload

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { editBanner, getAccountByUsername } from "../../axios/accountAxios";
import { imageUrl } from "../../config/config";
import Swal from "sweetalert2";

const EditBanner = () => {
  const [user, setUser] = useState({ bannerImage: "" });
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [banner, setBanner] = useState();
  const [isExist, setIsExist] = useState(false);

  const getBanner = () => {
    const username = localStorage.username;
    getAccountByUsername(username, (result) => {
      setUser({
        bannerImage: `${imageUrl}${result.profile.bannerImage}`,
      });
    });
  };
  useEffect(() => {
    getBanner();
    setBanner(localStorage.image);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setIsExist(true);

    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const navigation = useNavigate();
  const submitHandler = () => {
    if (file !== null) {
      const fromData = new FormData();
      fromData.append("banner", file);
      editBanner(fromData, (status, banner) => {
        if (status) {
          setBanner(banner);
          navigation("/profile");
        }
      });
    } else {
      Swal.fire("Edit Banner", "file cannot be empty", "error");
    }
  };
  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-center">
          <img
            src={isExist === false ? user.bannerImage : previewImage}
            className="card-img-top"
            style={{ width: "75%", height: "250px" }}
            alt=""
          ></img>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            image: {banner}
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setBanner(e.target.files[0].name);
              handleImageUpload(e);
            }}
          ></input>
        </div>
        <div className="d-flex justify-content-center">
          <Link
            type="submit"
            className="btn btn-primary mb-3"
            onClick={() => submitHandler()}
          >
            Confirm
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditBanner;

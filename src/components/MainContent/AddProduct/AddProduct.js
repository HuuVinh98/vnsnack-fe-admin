import "./AddProduct.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddProduct() {
  //lấy danh mục
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`http://api.vnsnack.com/category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);
  //lấy hình ảnh và hiện lên
  const [imgs, setImgs] = useState([]);
  //xoá ảnh
  const deleteImg = () => {
    setImgs([]);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgs([
        ...imgs,
        {
          image: URL.createObjectURL(e.target.files[0]),
        },
      ]);
    }
  };
  //chọn categories cho sản phẩm
  const [categories, setCategories] = useState([]);
  return (
    <div className="add-product">
      <h2>ADD NEW PRODUCT</h2>
      <ul className="flex f-column a-center">
        <li className="upload-imgs flex j-spaceBetween a-center">
          <span>Photos: </span>
          <div className="imgs flex">
            {imgs.map((val, idx) => {
              return (
                <div className="img">
                  <img src={val.image} />
                </div>
              );
            })}
          </div>
          {imgs.length !== 0 ? (
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={() => {
                deleteImg();
              }}
            />
          ) : (
            ""
          )}
        </li>
        <li>
          <span></span>
          <input
            type="file"
            onChange={(e) => {
              onImageChange(e);
            }}
          />
        </li>
        <li>
          <span>Name:</span>
          <input />
        </li>
        <li>
          <span>Categories:</span>
          <input list="categories" />
          <datalist id="categories">
            {category.map((val, idx) => {
              return (
                <option
                  key={idx}
                  value={val.name}
                  onClick={(e) => {
                    setCategories([...categories, e.target.value]);
                    console.log(categories);
                    console.log(e.target.value);
                  }}
                >
                  {val.name}
                </option>
              );
            })}
          </datalist>
          {/* <select>
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </select> */}
        </li>
        <li>
          <span>Price ($):</span>
          <input type="number" />
        </li>

        <li>
          <span>Quantity:</span>
          <input type="number" />
        </li>
        <li className="flex f-column">
          <span>Description:</span>
          <Editor />
        </li>

        <li className="flex a-center j-center">
          <button>Save</button>
          <button>
            <Link to="/">Exit</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

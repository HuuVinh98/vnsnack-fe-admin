import "./EditProduct.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditProduct() {
  const { id } = useParams();
  console.log(id);
  //lấy sản phẩm được chọn
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`http://api.vnsnack.com/product/${id}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [id]);
  console.log(product);
  //lấy danh mục
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`http://api.vnsnack.com/category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);
  //lấy hình ảnh và hiện lên
  const [imgs, setImgs] = useState([]);
  // {
  //   product.photos && setImgs([...imgs, product.photos]);
  // }

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

  return (
    <div className="add-product">
      <h2>CHỈNH SỬA SẢN PHẨM</h2>
      <ul className="flex f-column a-center">
        <li className="upload-imgs flex j-spaceBetween a-center">
          <span>Hình ảnh: </span>
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
          <span>Hình ảnh:</span>
          <input
            type="file"
            onChange={(e) => {
              onImageChange(e);
            }}
          />
        </li>
        <li>
          <span>Tên:</span>
          <input value={product.name} />
        </li>
        <li>
          <span>Danh mục:</span>
          <select>
            {/* <option value={product.categories[0].name}>
              {product.categories[0].name}
            </option> */}
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </li>
        <li>
          <span>Giá ($):</span>
          <input type="number" value={product.price} />
        </li>

        <li>
          <span>Số lượng:</span>
          <input type="number" value={product.quantity} />
        </li>
        <li className="flex f-column">
          <span>Mô tả:</span>
          <Editor></Editor>
          <p>{product.description}</p>
        </li>

        <li className="flex a-center j-center">
          <button>Lưu</button>
          <button>
            <a href="/">Thoát</a>
          </button>
        </li>
      </ul>
    </div>
  );
}

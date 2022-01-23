import "./AddProduct.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddProduct() {
  //lấy danh mục

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`http://api.vnsnack.com/category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);

  //biến chứa các thông tin của sản phẩm
  const [categories, setCategories] = useState([]); //chọn categories cho sản phẩm
  const [imgs, setImgs] = useState([]); //lấy hình ảnh và hiện lên
  const [name, setName] = useState(""); // lấy tên sản phẩm
  const [price, setPrice] = useState(0); // lấy giá sản phẩm
  const [quantity, setQuantity] = useState(0); // lấy số lượng sản phẩm
  const [desc, setDesc] = useState(""); //lấy mô tả sản phẩm
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //
  const [product, setProduct] = useState({}); // object sản phẩm
  // các funcion
  let deleteImg = () => {
    setImgs([]);
  }; //xoá ảnh
  let onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgs([
        ...imgs,
        {
          image: URL.createObjectURL(e.target.files[0]),
        },
      ]);
    }
  }; //thêm ảnh
  let onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDesc(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
  }; //thay đổi nội dung phần mô tả
  let validate = (product) => {
    if (price >= 0 && quantity >= 0) {
      setProduct({ imgs, name, categories, price, quantity, desc });
    } else {
      if (price < 0) alert("Price must be greater than or equal to 0");
      if (quantity < 0) alert("Quantity must be greater than or equal to 0");
    }
  }; // kiểm tra dữ liệu và upload

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
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </li>
        <li className="categories-datalist">
          <span>Categories:</span>
          <input
            list="categories"
            onBlur={(e) => {
              let temp = [...categories, e.target.value];
              setCategories(
                temp.filter((val, idx) => {
                  let index = temp.indexOf(val);
                  return idx === index;
                })
              );
            }}
          />
          <datalist id="categories">
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </datalist>
        </li>
        <li>
          <span>Price ($):</span>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </li>

        <li>
          <span>Quantity:</span>
          <input
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </li>
        <li className="flex f-column">
          <span>Description:</span>
          <Editor
            //  editorState={desc}
            initialEditorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
          {/* <textarea
            disabled
            value={
              editorState &&
              draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
            }
          /> */}
        </li>

        <li className="flex a-center j-center">
          <button
            onClick={() => {
              validate(product);
              console.log(product.categories);
            }}
          >
            Save
          </button>
          <button>
            <Link to="/">Exit</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

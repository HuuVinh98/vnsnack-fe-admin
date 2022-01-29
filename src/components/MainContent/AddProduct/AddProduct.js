import "./AddProduct.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import http from "../../../Store/Variable";
export default function AddProduct() {
  //toker
  const accessToken = localStorage.getItem("accessToken");
  //lấy danh mục

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${http}category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);

  //biến chứa các thông tin của sản phẩm
  const [categories, setCategories] = useState([]); //chọn categories cho sản phẩm
  const [photos, setPhotos] = useState([]); //lấy hình ảnh và hiện lên
  const [name, setName] = useState(""); // lấy tên sản phẩm
  const [price, setPrice] = useState(0); // lấy giá sản phẩm
  const [quantity, setQuantity] = useState(0); // lấy số lượng sản phẩm
  const [description, setDescription] = useState(""); //lấy mô tả sản phẩm
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //
  const [product, setProduct] = useState({
    photos,
    name,
    categories,
    price,
    quantity,
    description,
  }); // object sản phẩm
  useEffect(() => {
    setProduct({ photos, name, categories, price, quantity, description });
  }, [photos, name, categories, price, quantity, description]); // mỗi khi có thay đổi thì set lại giá trị

  // các funcion
  const deleteImg = () => {
    setPhotos([]);
  }; //xoá ảnh
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotos([
        ...photos,
        {
          url: URL.createObjectURL(e.target.files[0]),
        },
      ]);
    }
  }; //thêm ảnh
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    );
  }; //thay đổi nội dung phần mô tả
  const postData = (product) => {
    fetch(`${http}product`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
  };
  const validate = (product) => {
    if (price >= 0 && quantity >= 0 && name.length > 0) {
      postData(product);
      alert("Successfully added new products");
    } else {
      if (price < 0) alert("Price must be greater than or equal to 0");
      if (quantity < 0) alert("Quantity must be greater than or equal to 0");
      if (name.length <= 0) alert("Product must be have a name!");
    }
  }; // kiểm tra dữ liệu và upload

  return (
    <div className="add-product">
      <h2>ADD NEW PRODUCT</h2>
      <ul className="flex f-column a-center">
        <li className="upload-imgs flex j-spaceBetween a-center">
          <span>Photos: </span>
          <div className="imgs flex">
            {photos.map((val, idx) => {
              return (
                <div className="img">
                  <img src={val.image} />
                </div>
              );
            })}
          </div>
          {photos.length !== 0 ? (
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={(e) => {
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
              setCategories([...categories, { id: parseInt(e.target.value) }]);
            }}
          />
          <datalist id="categories">
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.id}>
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
              setPrice(parseFloat(e.target.value));
            }}
          />
        </li>

        <li>
          <span>Quantity:</span>
          <input
            type="number"
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
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
              //console.log("đây là sản phẩm:", product);
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

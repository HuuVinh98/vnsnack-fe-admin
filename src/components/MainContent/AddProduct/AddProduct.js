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
  const [categories, setCategories] = useState([{ id: 1 }, { id: 8 }]); //chọn categories cho sản phẩm
  const [photos, setPhotos] = useState([]); //lấy hình ảnh và hiện lên
  const [name, setName] = useState(""); // lấy tên sản phẩm
  const [price, setPrice] = useState(0); // lấy giá sản phẩm
  const [quantity, setQuantity] = useState(0); // lấy số lượng sản phẩm
  const [description, setDescription] = useState(""); //lấy mô tả sản phẩm
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //
  const [product, setProduct] = useState({}); // object sản phẩm
  // các funcion
  const deconsteImg = () => {
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
    console.log(product);
    fetch("http://api.vnsnack.com/product", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }; //post to api
  // async function _postData(url = "", data = {}) {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     mode: "cors",
  //     cache: "no-cache",
  //     credentials: "same-origin",
  //     redirect: "follow",
  //     referrerPolicy: "no-referrer",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   return response.json();
  // }
  const validate = (product) => {
    if (price >= 0 && quantity >= 0) {
      setProduct({ photos, name, categories, price, quantity, description });
      postData(product);
      // _postData("http://api.vnsnack.com/product", product)
      //   .then((json) => {
      //     console.log(json); // Handle success
      //   })
      //   .catch((err) => {
      //     console.log(err); // Handle errors
      //   });
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
              onClick={() => {
                deconsteImg();
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
            // onBlur={(e) => {
            //   const temp = [...categories, e.target.value];
            //   setCategories(
            //     temp.filter((val, idx) => {
            //       const index = temp.indexOf(val);
            //       return idx === index;
            //     })
            //   );
            // }}
          />
          <datalist id="categories">
            {category.map((val, idx) => {
              return <option key={idx}>{val.name}</option>;
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
              //console.log(product);
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

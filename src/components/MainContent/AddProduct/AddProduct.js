import "./AddProduct.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import apiHttp from "../../../Store/Variable";
export default function AddProduct() {
  // get token from localStogare

  const accessToken = localStorage.getItem("accessToken"); //get access token from localStogare

  //get category from api
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${apiHttp}category`)
      .then((res) => res.json())
      .then((category) => setCategory(category.data));
  }, []);

  //These are variables containing product information
  const [categories, setCategories] = useState([]); //selected categories
  const [photos, setPhotos] = useState([]); // photos
  const [name, setName] = useState(""); //name of the product
  const [price, setPrice] = useState(0); //price of the product
  const [quantity, setQuantity] = useState(0); // selected category
  const [description, setDescription] = useState(""); //description of product
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //
  const [product, setProduct] = useState({
    photos,
    name,
    categories,
    price,
    quantity,
    description,
  }); // objectified product

  useEffect(() => {
    setProduct({ photos, name, categories, price, quantity, description });
  }, [photos, name, categories, price, quantity, description]); // use useEffect to get current state (not privious state)

  //--------------funcions---------------
  const deleteImg = () => {
    setPhotos([]);
  }; //delete photos
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotos([
        ...photos,
        {
          url: URL.createObjectURL(e.target.files[0]),
        },
      ]);
    }
  }; //add photos
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    );
  }; //reset the value of the description when there is a change in the editor
  const postData = (product) => {
    fetch(`${apiHttp}product`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
  }; //post objectified product to api
  const validate = (product) => {
    if (price >= 0 && quantity >= 0 && name.length > 0) {
      postData(product);
      alert("Successfully added new products");
    } else {
      if (price < 0) alert("Price must be greater than or equal to 0");
      if (quantity < 0) alert("Quantity must be greater than or equal to 0");
      if (name.length <= 0) alert("Product must be have a name!");
    }
  }; // check data before post to api and post data to api if it is in correct format

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

import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import "./Product.scss";
import { Link } from "react-router-dom";
import Item from "./Item/Item";
import { useState, useEffect } from "react";
import defaultImage from "../../../images/default-image.png";
import http from "../../../Store/Variable";
export default function Product() {
  const [keyWord, setKeyWord] = useState(""); //từ khoá tìm tiếm
  const [sort, setSort] = useState("new"); // sắp xếp theo
  const [take, setTake] = useState(0); // số lượng hiển thị
  const [categoryId, setCategoryId] = useState("All"); //
  const [currentCategory, setCurrentCategory] = useState("");
  //lấy danh sách sản phẩm
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `${http}product?keyword=${keyWord}${
        take > 0 ? `&take=${take}` : ""
      }&sort=${sort}${categoryId !== "All" ? `&categoryId=${categoryId}` : ""}`
    )
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, [keyWord, sort, take, categoryId]);

  //lấy danh mục
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${http}category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);

  return (
    <div className="product flex f-column a-center">
      <h2>PRODUCTS INFOMATION</h2>
      <div className="tool-bar">
        <form className="flex j-spaceBetween">
          <input
            placeholder="Search"
            id="search"
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          <input
            placeholder="Number of display"
            id="number"
            type="number"
            value={take > 0 ? take : ""}
            onChange={(e) => {
              setTake(e.target.value);
            }}
          />
          Sort:
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="new">New</option>
            <option value="hot">Hot</option>
            <option value="expensive">Expensive</option>
          </select>
          Category:
          <select
            onChange={(e) => {
              setCategoryId(e.target.value);
              setCurrentCategory(e.target.value);
            }}
          >
            <option>All</option>
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
          <button>
            <Link to="/add-product">
              <FontAwesomeIcon icon={faPlus} />
              Add
            </Link>
          </button>
        </form>
      </div>
      <table className="statistical">
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Categories</th>
          <th>Photo</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
        {/* content in one row */}
        {products.map((val, idx) => {
          return (
            <Item
              stt={idx + 1}
              id={val.id}
              name={val.name}
              category={currentCategory}
              img={
                val.photos.find((img) => img.isThumbnail)
                  ? val.photos.find((img) => img.isThumbnail).url
                  : defaultImage
              }
              price={val.price}
              quantity={val.quantity}
            />
          );
        })}
      </table>
    </div>
  );
}

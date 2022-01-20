import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import "./Product.scss";
import mucrim from "../../../images/mucrim.png";
import Item from "./Item/Item";
import { useState, useEffect } from "react";
export default function Product() {
  const [keyWord, setKeyWord] = useState(""); //từ khoá tìm tiếm
  const [sort, setSort] = useState("new"); // sắp xếp theo
  const [take, setTake] = useState(0); // số lượng hiển thị
  const [categoryId, setCategoryId] = useState("Tất cả"); //
  const [currentCategory, setCurrentCategory] = useState("");
  //lấy danh sách sản phẩm
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `http://api.vnsnack.com/product?keyword=${keyWord}${
        take > 0 ? `&take=${take}` : ""
      }&sort=${sort}${
        categoryId !== "Tất cả" ? `&categoryId=${categoryId}` : ""
      }`
    )
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, [keyWord, sort, take, categoryId]);

  //lấy danh mục
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`http://api.vnsnack.com/category`)
      .then((res) => res.json())
      .then((category) => setCategory(category));
  }, []);

  return (
    <div className="product flex f-column a-center">
      <h2>THÔNG TIN SẢN PHẨM</h2>
      <div className="tool-bar">
        <form className="flex j-spaceBetween">
          <input
            placeholder="Tìm kiếm"
            id="search"
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          <input
            placeholder="Số hiển thị"
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
          Danh mục:
          <select
            onChange={(e) => {
              setCategoryId(e.target.value);
              setCurrentCategory(e.target.value);
            }}
          >
            <option>Tất cả</option>
            {category.map((val, idx) => {
              return (
                <option key={idx} value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
          <button>
            <a href="/add-product">
              <FontAwesomeIcon icon={faPlus} />
              Thêm mới
            </a>
          </button>
        </form>
      </div>
      <table className="statistical">
        <tr>
          <th>STT</th>
          <th>Tên</th>
          <th>Danh mục</th>
          <th>Ảnh</th>
          <th>Giá</th>

          <th>Số lượng</th>

          <th>New</th>
          <th>Hot</th>
          <th>Expensive</th>
          <th>Tác vụ</th>
        </tr>
        {/* content in one row */}
        {products.map((val, idx) => {
          return (
            <Item
              stt={idx + 1}
              id={val.id}
              name={val.name}
              category={currentCategory}
              img={val.photos.find((img) => img.isThumbnail).url}
              price={val.price}
              quantity={val.quantity}
              news={true}
            />
          );
        })}
      </table>
    </div>
  );
}

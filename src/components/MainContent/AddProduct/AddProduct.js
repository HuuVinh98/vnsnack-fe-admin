import "./AddProduct.scss";
export default function AddProduct() {
  return (
    <div className="add-product">
      <h2>THÊM SẢN PHẨM MỚI</h2>
      <ul className="flex f-column a-center">
        <li>
          <span>Hình ảnh: </span>
          <img />
        </li>
        <li>
          <span>Hình ảnh:</span>
          <input type="file" />
        </li>
        <li>
          <span>Tên:</span>
          <input />
        </li>
        <li>
          <span>Danh mục:</span>
          <input />
        </li>
        <li>
          <span>Giá:</span>
          <input />
        </li>

        <li>
          <span>Số lượng:</span>
          <input />
        </li>
        <li>
          <span>Mô tả:</span>
          <textarea />
        </li>

        <li className="flex a-center j-center">
          <button>Lưu</button>
          <button>Thoát</button>
        </li>
      </ul>
    </div>
  );
}

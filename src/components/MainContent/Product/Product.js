import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import "./Product.scss";
import mucrim from "../../../images/mucrim.png";
import Item from "./Item/Item";
export default function Product() {
  return (
    <div className="product flex f-column a-center">
      <div className="tool-bar">
        <form className="flex j-spaceBetween">
          <input placeholder="Tìm kiếm" id="search" />
          <input placeholder="Số hiển thị" id="number" />
          Filter:
          <select>
            <option>New</option>
            <option>Hot</option>
            <option>Expensive</option>
          </select>
          <button>
            <FontAwesomeIcon icon={faPlus} />
            Thêm mới
          </button>
        </form>
      </div>
      <table className="statistical">
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>STT</th>
          <th>Tên</th>
          <th>Danh mục</th>
          <th>Ảnh</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hạn sử dụng</th>
          <th>New</th>
          <th>Hot</th>
          <th>Expensive</th>
          <th>Tác vụ</th>
        </tr>
        {/* content in one row */}
        <Item
          stt={1}
          name={"Mực rim me"}
          category={"Hải sản"}
          img={mucrim}
          price={35}
          quantity={52}
          exp={"22/5/22"}
        />
        <Item
          stt={2}
          name={"Mực rim me"}
          category={"Hải sản"}
          img={mucrim}
          price={35}
          quantity={52}
          exp={"22/5/22"}
        />
      </table>
    </div>
  );
}

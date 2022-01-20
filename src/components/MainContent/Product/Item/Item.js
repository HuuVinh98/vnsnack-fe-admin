import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
export default function Item({
  stt,
  name,
  category,
  img,
  price,
  id,
  quantity,
  hot,
  news,
  expensive,
}) {
  return (
    <tr>
      <td>{stt}</td>
      <td style={{ textAlign: "left" }}>{name}</td>
      <td>{category}</td>
      <td>
        <img src={img} />
      </td>
      <td>{price}$</td>

      <td>{quantity}</td>

      <td className="checkbox-new">
        <input type="checkbox" checked={news === true ? "checked" : ""} />
      </td>
      <td className="checkbox-hot">
        <input type="checkbox" checked={hot === true ? "checked" : ""} />
      </td>
      <td className="checkbox-expensive">
        <input type="checkbox" checked={expensive === true ? "checked" : ""} />
      </td>
      <td>
        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}

import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
export default function Item({
  stt,
  name,
  category,
  img,
  price,
  quantity,
  exp,
}) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{stt}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>
        <img src={img} />
      </td>
      <td>{price}$</td>
      <td>{quantity}</td>
      <td>{exp}</td>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}

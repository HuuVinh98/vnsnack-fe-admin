import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export default function Item({
  stt,
  name,
  category,
  img,
  price,
  id,
  quantity,
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

      <td>
        <Link to={`/edit-product/${id}`}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
        </Link>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}

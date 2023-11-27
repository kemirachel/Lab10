
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import{Link} from 'react-router-dom';
import axios from 'axios';


{/*Added functional component called bookItems to application*/}

      {/*Added the edit functionality for the application. When a user clicks the edit button a
    new window will open with the entire book shown on this new component.*/}

function Bookitem(props){

    {/*added a map function to split the array of books
into individual books. */}

    return(
        <div>
     {/*Added card comonents to application*/}

 <Card>
      <Card.Body>{props.mybook.title}</Card.Body>
      {/*link to edit a finished book item */}
      <Link to={"/edit/" +props.mybook._id} className = 'btn btn-primary'>Edit</Link>
      {/*added a delet button */}
            <Button onClick={(e) => {
                e.preventDefault();
                axios.delete('http://localhost:4000/api/book/' +props.mybook._id)
                .then((res)=>{
                    props.reload();
                })
                .catch();

            }}className='btn btn-danger'>Delete</Button>
 </Card>

    <img src={props.mybook.cover}></img>
    <p>{props.mybook.author}</p>
        </div>
    );


}
export default Bookitem;
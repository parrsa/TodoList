import{React,useState,useEffect,useMemo,useContext , axios , Swal,instance,Link} from '../Import/import'
import{Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,Button,Container, DeleteOutline,BorderColor,ArrowBack,AddCircle} from '../Import/importmui'
import { ListTodo } from "../App";
import { upload } from "@testing-library/user-event/dist/upload";

const TodoTable = () => {
  const Swal = require('sweetalert2')
  const [List, SetTodoList] = useState([]);
  const [editing, setEditing] = useState(false)
  const [Titles, setTitle] = useState('')
  const [Dess, SetDescription] = useState('')
  const [IdNum , setNum]=useState(null)

  const DeleteItem = (item) => {
    instance({
      url:`app/todo/${item}/`,
      method:"Delete"
    }) .then(res => console.log(res))
  }

  let ArrayTodo=useContext(ListTodo)
  useEffect(()=>{
    SetTodoList(ArrayTodo)
  },[ArrayTodo])

  const EditeItem = (item) => {
   setNum(item) 
   setEditing(!editing)
  }


  const Updatae = (item) => {
    const data = {
      title: Titles,
      description: Dess
    };
    instance({
      url:`app/todo/${item}/`,
      method:"patch",
      data:data
    })
      .then(res =>{
        if(res.status===201){
          setTitle('')
          SetDescription('')
        }
      })
  }

  return (
    <div style={{fontWeight:"bold" , fontFamily:"monospace"}}>
   <Link to='/'>
   <Button variant="outlined">
   <ArrowBack/>
   </Button>
   </Link> 
    <h1 style={{textAlign:"center" , fontSize:"35px", color:"white" , marginBottom:"20px"}}>Todo List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Ttile</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ overflow: "hidden" }}>
            {List.map((item) => (
              <>
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell key={item.id} onClick={() => EditeItem(item.id)}>
                    <BorderColor />
                  </TableCell>
                  <TableCell onClick={() => DeleteItem(item.id)}>
                    <DeleteOutline />
                  </TableCell>
                </TableRow>
                { (item.id == IdNum && editing) &&
                  <div>
                    <TableRow >
                    <TableCell>{item.id}</TableCell>

                      <TableCell>
                        <TextField
                          value={Titles}
                          onChange={(e) => setTitle(e.target.value)}
                          id="outlined-uncontrolled"
                          label="Title"
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          value={Dess}
                          onChange={(e) => SetDescription(e.target.value)}
                          id="outlined-uncontrolled"
                          label="Description"
                        /></TableCell>

                      <TableCell>
                        <Button  onClick={() => Updatae(item.id)} variant="outlined" >
                          Send
                        </Button>
                      </TableCell>

                    </TableRow>
                  </div> 
                }
              </>
            )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodoTable;

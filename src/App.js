import './App.css';
import {React , useState , useEffect , createContext , Routes , Route , axios , instance , TodoForm , TodoTable} from './Import/import'
export const ListTodo=createContext();
function App() {
  const [TodoList, SetTodoLists] = useState([]);
  
  useEffect(() => {
    instance({
      url:"app/todo/",
      method:"GET"
    })
        .then(res =>{
          SetTodoLists(res.data) 
        } )
        .catch(err => console.log(err)
        )
    }, [TodoList]);

  return (
      <div>
      <Routes>
        <Route path="/" element={<TodoForm/>} />
        <Route path='/TodoTable'  element={<ListTodo.Provider value={TodoList}><TodoTable/></ListTodo.Provider>}/>
      </Routes>
      </div>
  );
}

export default App;

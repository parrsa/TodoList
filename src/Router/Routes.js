import { useContext } from "react";
import TodoForm1 from "../Components/TodoFrom";
import TodoTable from "../Components/TodoTable";
const route=[
    {path:'/' , element:<TodoForm1/>},
    {path:'/TodoTable' , element:<TodoTable/>}
];

export default route
import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {InputAdornment, Table, TableCell, TableHead, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editable, setEditable] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deletable, setDeletable] = useState(false);
    const [todoBeDeleted, setTodoBeDeleted] = useState(null);
    return (
        <Fragment>
            <form onSubmit={(event) => {
                event.preventDefault();
                context.createTodo(event, addTodo)
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align={"right"}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    value={addTodo}
                                    onChange={(event)=> {
                                        setAddTodo(event.target.value)}}
                                    label={"New Task"}
                                    fullWidth={true}
                                />
                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton type={"submit"}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, i)=>(
                            <TableRow key={i}>
                                <TableCell>

                                    {editable === todo.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value)}}
                                            InputProps={{
                                                endAdornment:
                                                    <Fragment>
                                                        <IconButton onClick={() => {
                                                            context.updateTodo({id: todo.id, name: editTodo});
                                                            setEditable(false);
                                                        }}>
                                                            <DoneIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={()=> {
                                                            setEditable(false)
                                                        }}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    </Fragment>
                                            }}
                                        />
                                        :
                                        <p onDoubleClick={()=>
                                        {setEditable(todo.id); setEditTodo(todo.name)}}>{todo.name}</p>
                                    }
                                </TableCell>
                                <TableCell align={"right"}>
                                    <IconButton onClick={()=> {setEditable(todo.id); setEditTodo(todo.name)}}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {{
                                        setDeletable(true);
                                        setTodoBeDeleted(todo)
                                    }}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            {deletable && (
                <DeleteDialog
                    todo={todoBeDeleted}
                    open={deletable}
                    setDeletable={setDeletable}
                />
            )}

        </Fragment>
    );
}

export default TodoTable;
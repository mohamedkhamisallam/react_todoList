import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState(``);
  const inputRef = useRef(``);
  const inputRefUpdate = useRef(``);
  const disabeDelete = useRef("");
  const [Todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("todos");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [index, setIndex] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((currentTodo) => {
      return [
        ...currentTodo,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);
  const toggleTodo = (id, completed) => {
    setTodos((prevTodo) => {
      return prevTodo.map((ele) => {
        if (ele.id === id) {
          return { ...ele, completed };
        }
        return ele;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) => {
      return prevTodo.filter((ele) => ele.id !== id);
    });
  };

  const selectTodo = (index) => {
    const newTodo = [...Todos];
    // newTodo[index].completed = !newTodo[index].completed;
    setIndex(index);
    setTodos(newTodo);
    inputRef.current.className = "display";
    inputRefUpdate.current.value = Todos[index].title;
  };
  const updateTodo=()=>{
    let newTodo=[...Todos]
    newTodo[index].title=inputRefUpdate.current.value
    setTodos(newTodo)
    
      

  }
  const remove=()=>{
    inputRef.current.className = "update";
  }
  
  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            name="item"
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">TODO LIST</h1>
      <ul className="list">
        {Todos.length == 0 ? <h3>NO TODOS</h3> : ""}
        {Todos.map((ele, index) => {
          return (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={ele.completed}
                  onChange={(e) => toggleTodo(ele.id, e.target.checked)}
                />
                {ele.title}
              </label>

              <button
                onClick={() => {
                  deleteTodo(ele.id);
                }}
                className="btn btn-danger"
                ref={disabeDelete}
                disabled={false}
              >
                {" "}
                Delete
              </button>
              <button
                onClick={() => {
                  selectTodo(index);
                }}
                className="btn btn-danger"
              >
                {" "}
                UPDATE
              </button>
            </li>
          );
        })}
      </ul>
      <div className="update" ref={inputRef}>
        <input
          ref={inputRefUpdate}
          onChange={(e) => {
            updateTodo();
          }}
        />
        <button   onClick={remove} className="btn btn-danger " > OK</button>
      </div>
    </>
  );
}

export default App;

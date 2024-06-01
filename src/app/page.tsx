"use client";
import { TodoType } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [modal, showModal] = useState(false);
  const [todoText, setTodoText] = useState("");

  const createTodo = () => {
    // return  if the user enter the empty message
    if (todoText.length == 0 || todoText == "") {
      alert("Todo cannot be an empty");
    }

    // fetch the todos list , from local storage
    let localStorageTodos = localStorage.getItem("todos");

    // creating the new object of todos
    let newTodoObj = {
      text: todoText,
      status: false,
      id: new Date().getTime(),
    };

    // check the local storage is not null
    if (localStorageTodos == null) {
      localStorage.setItem("todos", JSON.stringify([newTodoObj]));
    } else {
      //if it is not null then , push the todo obj in the stored todos arrays
      let toodsArr = JSON.parse(localStorageTodos);
      toodsArr.push(newTodoObj);
      localStorage.setItem("todos", JSON.stringify(toodsArr));
    }

    setTodoText("");
  };
  const updateTodo = (id: number) => {
    let todoToUpdate = localStorage.getItem("todos");

    if (todoToUpdate) {
      let update = JSON.parse(todoToUpdate);

      const currentTodo = update.find((item: TodoType) => item.id === id);

      let index = update.indexOf(currentTodo);

      update[index].status = !update[index].status;

      localStorage.setItem("todos", JSON.stringify(update));
    }
  };
  const deletTodo = (id: number) => {};

  const getTodos = () => {
    let tempTodo = localStorage.getItem("todos");
    console.log("temp todo", tempTodo);

    if (tempTodo == null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(tempTodo));
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <>
      <div>
        <h1>To do App</h1>

        {/* displaye todos */}

        <div>
          {/* todos card */}

          {todos?.length > 0 ? (
            todos?.map((item) => (
              <>
                <div className="flex items-center gap-2">
                  <h3>{item?.text}</h3>
                  <p>{item?.status}</p>

                  {/* buttons */}
                  <div className="flex items-center gap-3">
                    <button onClick={() => deletTodo(item?.id)}>Delete</button>
                    <button onClick={() => updateTodo(item?.id)}>Update</button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>Sorry no todos present</p>
          )}
        </div>

        {/* create todo */}

        <div>
          <button onClick={() => showModal(true)}> create todo</button>
        </div>

        {modal && (
          <>
            <div>
              <h2>this is create todo modal</h2>

              <input
                type="text"
                placeholder="type your todo"
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
              />

              <button onClick={() => createTodo()}> Add this todo</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

import { useEffect } from "react";
import { useState, useRef } from "react";
import TodoList from "../components/TodoList";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef("");

  let token = localStorage.getItem("access_token");

  const getTodoList = () => {
    //투두 리스트 가져오는 함수
    const url = "https://pre-onboarding-selection-task.shop/todos";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setTodos(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const postTodolist = () => {
    //투두 리스트 추가 함수
    const url = "https://pre-onboarding-selection-task.shop/todos";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        todoRef.current.value = "";
        getTodoList(); //추가 후 투두 리스트 다시 불러오기
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteTodo = (index) => {
    //삭제함수
    const deleteItem = todos.filter((idx) => idx.id === index.id);
    const id = deleteItem[0].id;
    const url = `https://pre-onboarding-selection-task.shop/todos/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        getTodoList(); //삭제 후 투두 리스트 다시 불러오기
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);
  return (
    <>
      <input data-testid="new-todo-input" ref={todoRef} />
      <button data-testid="new-todo-add-button" onClick={postTodolist}>
        추가
      </button>
      <ul>
        {todos &&
          todos.map((list) => {
            return (
              <TodoList
                list={list}
                deleteTodo={deleteTodo}
                key={list.id}
                getTodoList={getTodoList}
              />
            );
          })}
      </ul>
    </>
  );
};

export default Todo;

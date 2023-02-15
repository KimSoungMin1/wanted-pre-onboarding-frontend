import { useState } from "react";

const Edit = ({ editClick, list, getTodoList, done, checkBox }) => {
  const [todoText, setTodoText] = useState(list.todo);

  let token = localStorage.getItem("access_token");
  const todoChang = (e) => {
    setTodoText(e.target.value);
  };
  const modify = () => {
    const id = list.id;
    const url = `https://pre-onboarding-selection-task.shop/todos/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoText,
        isCompleted: done,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        editClick();
        getTodoList();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={checkBox} />
        <input
          data-testid="modify-input"
          onChange={todoChang}
          value={todoText}
        />
        <button data-testid="submit-button" onClick={() => modify(list.id)}>
          제출
        </button>
        <button data-testid="cancel-button" onClick={editClick}>
          취소
        </button>
      </label>
    </li>
  );
};
export default Edit;

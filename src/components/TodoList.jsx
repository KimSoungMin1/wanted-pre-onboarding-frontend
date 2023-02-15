import { useState } from "react";
import Edit from "./Edit";
const TodoList = ({ list, deleteTodo, getTodoList }) => {
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(list.isCompleted);

  const checkBox = (e) => {
    //체크박스로 todo 완료 여부 확인
    const checked = e.target.checked;
    if (checked) {
      setDone(checked);
    } else {
      setDone(false);
    }
  };
  const editClick = () => {
    //수정 클릭시 input 변환용
    setEdit(!edit);
  };
  return (
    <>
      {edit ? (
        <Edit
          editClick={editClick}
          list={list}
          getTodoList={getTodoList}
          done={done}
          checkBox={checkBox}
        />
      ) : (
        <li>
          <label>
            <input type="checkbox" checked={done} onChange={checkBox} />
            <span>{list.todo}</span>
            <button data-testid="modify-button" onClick={editClick}>
              수정
            </button>
          </label>
          <button data-testid="delete-button" onClick={() => deleteTodo(list)}>
            삭제
          </button>
        </li>
      )}
    </>
  );
};

export default TodoList;

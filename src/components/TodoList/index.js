import React, { Component } from "react";
import Header from "../Header";
import Aside from "../Aside";
import isLogin from "../../constants/isLogin";
import TodoListTemplate from "../TodoListTemplate";
import Form from "../Form";
import TodoItemList from "../TodoItemList";

class TodoList extends Component {
  id = 3; // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: "",
    todos: [
      { id: 0, text: " 10/14 알고리즘 미션 하기", checked: true },
      { id: 1, text: " 10/15 sqld 자격증 공부하기", checked: true },
      { id: 2, text: " 10/16 알고리즘 미션 하기", checked: false },
    ],
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: "", // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
      }),
    });
  };

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };
  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
    } = this;

    return (
      <div className="App">
        <Header />
        <Aside isLogin={isLogin()} />
        <div className="container1">
          <TodoListTemplate
            form={
              <Form
                value={input}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                onCreate={handleCreate}
              />
            }
          >
            <TodoItemList
              todos={todos}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          </TodoListTemplate>
        </div>
      </div>
    );
  }
}

export default TodoList;

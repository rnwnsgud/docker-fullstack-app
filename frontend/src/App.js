import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    //여기서 데이터베이스에 있는 값을 가져온다.
    axios.get("/api/values").then((res) => {
      console.log("response", res);
      setLists(res.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");
  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value: value }).then((res) => {
      if (res.data.success) {
        console.log("response", res);
        setLists([...lists, res.data]);
        setValue("");
      } else {
        alert("값을 DB에 넣지 못했습니다.");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;

import { Button, Input } from "antd";

import { useContext, useRef } from "react";
import { CHANGE_USER_NAME } from "../../actions/type";
import { Context } from "../Context/Context";
import { useStore } from "../hooks/useStore";

const Test = () => {
  const userRef = useRef([]);

  const handleChangeName = () => {
    const inputValue = userRef.current[0].input.value;
    console.log(userRef);
    console.log(inputValue);
  };
  return (
    <div>
      <Input
        style={{ width: 150 }}
        ref={(el) => (userRef.current[0] = el)}
        defaultValue="abc"
      ></Input>
      <Button type="primary" onClick={handleChangeName}>
        1st
      </Button>
      <Input
        style={{ width: 150 }}
        ref={(el) => (userRef.current[1] = el)}
        defaultValue="hihi"
      ></Input>
      <Button type="primary" onClick={handleChangeName}>
        2nd
      </Button>
    </div>
  );
};
export default Test;

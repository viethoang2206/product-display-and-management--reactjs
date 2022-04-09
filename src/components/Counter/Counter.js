import { Button } from "antd";
import { useContext } from "react";
import { DEC, INC } from "../../actions/type";
import { Context } from "../Context/Context";
import { useStore } from "../hooks/useStore";

const Counter = () => {
  const [state, dispatch] = useStore();
  return (
    <div className="Counter">
      <Button
        onClick={() => {
          dispatch({ type: DEC, data: 1 });
        }}
      >
        -
      </Button>
      <h1>{state.counterReducer.number}</h1>
      <Button
        onClick={() => {
          dispatch({ type: INC, data: 1 });
        }}
      >
        +
      </Button>
    </div>
  );
};
export default Counter;

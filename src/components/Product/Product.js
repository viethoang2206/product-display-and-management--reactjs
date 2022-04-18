import { Button, Col, Input, InputNumber, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  CANCEL_PRICE,
  CANCEL_PRODUCT,
  DELETE_PRODUCTS,
  EDIT_PRICE,
  EDIT_PRODUCTS,
  SAVE_PRICE,
  SAVE_PRODUCTS,
} from "../../actions/type";
import { useStore } from "../hooks/useStore";
import "./Product.scss";
const Product = () => {
  const [state, dispatch] = useStore();

  const [priceState, setPriceState] = useState(false);
  const [getProductInfo, setProductInfo] = useState(null);
  const productRef = useRef([]);
  const priceRef = useRef([]);
  const findItem = (id) => {
    const item = state.status.find((val) => {
      if (val.id === id) {
        return val;
      }
    });
    console.log(item);
    return item.value;
  };
  const findPrice = (id) => {
    const item = state.priceStatus.find((val) => {
      if (val.id === id) {
        return val;
      }
    });
    console.log(item);
    return item.value;
  };
  const handleDelete = (id) => {
    dispatch({ type: DELETE_PRODUCTS, id });
  };
  const handleProduct = (id) => {
    console.log(!findItem(id));
    if (!findItem(id)) {
      dispatch({ type: EDIT_PRODUCTS, id });
      if (!getProductInfo) {
        setProductInfo(state.products[id - 1]);
      }
    } else {
      if (getProductInfo.id === id) {
        const input = productRef.current[id - 1].input.value;
        dispatch({ type: SAVE_PRODUCTS, id, input });
      } else {
        const input = productRef.current[id - 1].input.value;
        dispatch({ type: SAVE_PRODUCTS, id, input });
      }
    }
  };
  const handlePrice = (id) => {
    if (!findPrice(id)) {
      dispatch({ type: EDIT_PRICE, id });
      if (!priceState) {
        setPriceState(state.products[id - 1]);
      }
    } else {
      if (priceState.id === id) {
        const input = priceRef.current[id - 1].value;
        dispatch({ type: SAVE_PRICE, id, input });
      } else {
        const input = priceRef.current[id - 1].value;
        dispatch({ type: SAVE_PRICE, id, input });
      }
    }
  };
  const handleInput = (value, id) => {
    return (
      <Input
        ref={(el) => (productRef.current[id - 1] = el)}
        style={{ width: 150 }}
        defaultValue={value}
      />
    );
  };
  const handlePriceInput = (value, id) => {
    return (
      <InputNumber
        ref={(el) => (priceRef.current[id - 1] = el)}
        style={{ width: 150 }}
        defaultValue={value}
      />
    );
  };
  const handleCancelProduct = (id) => {
    dispatch({ type: CANCEL_PRODUCT, id });
  };
  const handleCancelPrice = (id) => {
    dispatch({ type: CANCEL_PRICE, id });
  };
  return (
    <div className="container">
      <h1>Products</h1>
      <Row gutter={[16, 8]}>
        {state.products.map((val, index) => (
          <Col span={8} key={val.id} className="item">
            <div className="item-adj">
              <img src={val.image} alt="" />
              <div className="pd-adj">
                {state.status[index].value
                  ? handleInput(val.name, val.id)
                  : val.name}
              </div>
              <div className="pd-adj">
                {state.priceStatus[index].value
                  ? handlePriceInput(val.price, val.id)
                  : val.price}
              </div>
              <Button
                className="btn-adj"
                type="primary"
                onClick={() => handleDelete(val.id)}
              >
                Delete
              </Button>
              <Button
                onClick={() => handleProduct(val.id)}
                className="btn-adj"
                type="primary"
              >
                {state.status[index].value ? "Save product" : "Edit product"}
              </Button>
              {state.status[index].value && (
                <Button
                  onClick={() => handleCancelProduct(val.id)}
                  className="btn-adj cancel"
                  type="primary"
                >
                  Cancel
                </Button>
              )}
              <Button
                className="btn-adj"
                onClick={() => handlePrice(val.id)}
                type="primary"
              >
                {state.priceStatus[index].value ? "Save price" : "Edit price"}
              </Button>
              {state.priceStatus[index].value && (
                <Button
                  onClick={() => handleCancelPrice(val.id)}
                  type="primary"
                  className="cancel"
                >
                  Cancel
                </Button>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Product;

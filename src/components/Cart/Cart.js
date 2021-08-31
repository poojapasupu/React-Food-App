import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [errorInSubmission, setErrorInSubmission] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const toggleCheckoutForm = (ev) => {
    setShowCheckoutForm((state) => {
      return !state;
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-55fae-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          orders: cartCtx.items,
          totalAmount: cartCtx.totalAmount,
          userData: userData,
        }),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    if (!response.ok) {
      setErrorInSubmission(true);
    } else {
      setOrderSubmitted(true);
      cartCtx.clearCart();
    }
  };

  const cartModalContent = (
    <>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckoutForm && (
        <Checkout
          onConfirm={onSubmitHandler}
          onCancel={toggleCheckoutForm}
        ></Checkout>
      )}
      {!showCheckoutForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={toggleCheckoutForm}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingContent = (
    <>
      <p>Submitting the order...</p>
    </>
  );

  const submittedOrderContent = (
    <>
      <p>Submitted the order successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  const errorContent = (
    <>
      <p>Error occurred! please try again!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          OK
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting &&
        !orderSubmitted &&
        !errorInSubmission &&
        cartModalContent}
      {isSubmitting && isSubmittingContent}
      {errorInSubmission && errorContent}
      {orderSubmitted && submittedOrderContent}
    </Modal>
  );
};

export default Cart;

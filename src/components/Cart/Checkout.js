import React from "react";
import classes from "./Checkout.module.css";
import useInputValidity from "../UI/use-inputValidity";

const Checkout = (props) => {

  const isNotEmpty = (value) => value.trim().length !== 0;
  const is5Chars = (value) => value.trim().length === 5;

  const {
    enteredInput: enteredName,
    isInputValid: isNameValid,
    hasError: nameHasError,
    inputChangehandler: nameChangeHandler,
    inputBlurhandler: nameBlurHandler,
    resetInput: resetName,
  } = useInputValidity(isNotEmpty);

  const {
    enteredInput: enteredStreet,
    isInputValid: isStreetValid,
    hasError: streetHasError,
    inputChangehandler: streetChangeHandler,
    inputBlurhandler: streetBlurHandler,
    resetInput: resetStreet,
  } = useInputValidity(isNotEmpty);

  const {
    enteredInput: enteredCity,
    isInputValid: isCityValid,
    hasError: cityHasError,
    inputChangehandler: cityChangeHandler,
    inputBlurhandler: cityBlurHandler,
    resetInput: resetCity,
  } = useInputValidity(isNotEmpty);

  const {
    enteredInput: enteredPostal,
    isInputValid: isPostalValid,
    hasError: postalHasError,
    inputChangehandler: postalChangeHandler,
    inputBlurhandler: postalBlurHandler,
    resetInput: resetPostal,
  } = useInputValidity(is5Chars);

  const formValid =
    isNameValid && isStreetValid && isPostalValid && isCityValid;

  const confirmHandler = (ev) => {
    ev.preventDefault();

    if (!formValid) {
      return;
    }

    // console.log(enteredName, enteredStreet, enteredPostal, enteredCity);

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postal: enteredPostal
    });
    resetName();
    resetPostal();
    resetStreet();
    resetCity();
  };

  const nameInputClasses = nameHasError ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p className={classes.error}>Name has error</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p className={classes.error}>Street has error</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p className={classes.error}>Postal has error</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p className={classes.error}>City has error</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

import {useState} from 'react';

const useInputValidity = (validityFn) => {
    const [enteredInput, setEnteredInput] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isInputValid = validityFn(enteredInput);
    const hasError = !isInputValid && isTouched;

    const inputChangehandler = (ev) => {
        setEnteredInput(ev.target.value);
    };


    const inputBlurhandler = (ev) => {
        setIsTouched(true);
    };

    const resetInput = () =>{
        setIsTouched(false);
        setEnteredInput('');
    };



    return {
        enteredInput,
        isInputValid,
        hasError,
        inputChangehandler,
        inputBlurhandler,
        resetInput
    };
    
};

export default useInputValidity;
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
/** References: https://react.dev/reference/react/hooks */

/** Hooks let you use different React features from your components. */

function App() {
  /**State Hooks 
State lets a component “remember” information like user input.

To add state to a component, use one of these Hooks:
1. useState declares a state variable that you can update directly.
2. useReducer declares a state variable with the update logic inside a reducer function. 
Note: Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer.*/

  //parameters are default state values
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  /**Ref Hooks 
Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.
1. useRef declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node. 
2. useImperativeHandle(not used much)*/

  const passwordRef = useRef(null);

  /**Performance Hooks 
A common way to optimize re-rendering performance is to skip unnecessary work. For example, you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render.
To skip calculations and unnecessary re-rendering, use one of these Hooks:
1. useMemo lets you cache the result of an expensive calculation.
2. useCallback** lets you cache a function definition before passing it down to an optimized component. */

  const copyPwToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    if (length >= 8) {
      let pw = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstqvwxyz";

      if (isNumber) {
        str += "0123456789";
      }

      if (isChar) {
        str += "`~!@#$%^&*()_+-={}[]:;<>,.?/''|";
      }

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pw += str.charAt(char);
      }

      setPassword(pw);
    }
  }, [length, isNumber, isChar, setPassword]); //array contains dependencies for the function

  /**Effect Hooks 
Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

1. useEffect connects a component to an external system. 
There are two rarely used variations of useEffect with differences in timing:
1. useLayoutEffect fires before the browser repaints the screen. You can measure layout here.
2. useInsertionEffect fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.*/

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isChar, passwordGenerator]);

  return (
    <>
      <div className="bg-slate-400 h-screen w-screen ">
        <h1 className="text-center text-slate-800 text-2xl font-bold py-4">
          Password Generator
        </h1>
        <div className="flex flex-row justify-center m-5 ">
          <div className="  text-center w-7/12 shadow-lg shadow-slate-950 bg-slate-200 ">
            <div className="items-center p-5">
              <input
                type="text"
                value={password}
                placeholder="generated password"
                className="outline-none rounded-s-full h-9 px-3 py-1 my-2 bg-slate-300"
                readOnly
                ref={passwordRef}
              />
              <button
                className="px-3 py-1 h-9 rounded-e-full bg-orange-300 copy-btn"
                onClick={copyPwToClip}
              >
                COPY
              </button>
            </div>

            <div className=" p-5">
              <input
                type="range"
                min={0}
                max={20}
                value={length}
                className=" cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                id="range"
              />
              <label htmlFor="range">Length: {length}</label>
            </div>
            <div className="p-5">
              <input
                type="checkbox"
                defaultChecked={isNumber}
                onChange={() => {
                  setIsNumber((prev) => !prev);
                }}
                id="number-check"
                className=" w-10"
              />
              <label htmlFor="number-check">Number</label>
              <input
                type="checkbox"
                defaultChecked={isChar}
                onChange={() => {
                  setIsChar((prev) => !prev);
                }}
                id="character-check"
                className=" w-10"
              />
              <label htmlFor="character-check">Character</label>
            </div>
            <div className="p-5">
              <button
                className="refresh-btn px-3 py-1 rounded-full bg-cyan-500"
                onClick={passwordGenerator}
              >
                GENERATE NEW PASSWORD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default App;

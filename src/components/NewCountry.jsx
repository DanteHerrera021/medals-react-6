import { useState } from "react";
import "./NewCountry.css";

export default function NewCountry(props) {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addCountry(name);
    hideDialog();
  }

  function hideDialog() {
    setName("");
    setIsActive(false);
  }

  function handleKeyUp(e) {
    e.keyCode === 27 && hideDialog();
  }

  return (
    <>
      {isActive ? (
        <>
          <div id="overlay" onClick={hideDialog}></div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            onKeyUp={(e) => handleKeyUp(e)}
            id="new-country-container"
          >
            <header>
              <h2>New Country</h2>
            </header>

            <div className="input-container">
              <label htmlFor="name">Country Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="button-container">
              <button
                type="submit"
                className="submit"
                disabled={name == "" && !name.trim().length}
              >
                Add Country
              </button>
              <button type="submit" className="remove" onClick={hideDialog}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          onClick={() => setIsActive(true)}
          id="trigger-btn"
          className="circle-btn success"
        >
          +
        </button>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import "./app.css";

export default function App() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");
  const [numGuesses, setNumGuesses] = useState(0);
  const [currState, setCurrState] = useState("");
  function checkGuess(guess) {
    var currstatus = currState;
    if (word.includes(guess)) {
      for (var i = 0; i < word.length - guess.length + 1; i++) {
        if (word.substring(i, i + guess.length) == guess) {
          for (var j = i; j < i + guess.length; j++) {
            currstatus[j] = guess[j - i];
          }
        }
      }
      if (!currstatus.includes("_ ")) {
        setNumGuesses(0);
        setWord("");
        setGuess("");
        setCurrState("");
        alert("Congrats! You won :)");
      } else {
        setCurrState(currstatus);
      }
    } else {
      setNumGuesses(numGuesses + guess.length);
      if (numGuesses >= 4) {
        setWord("");
        setGuess("");
        setNumGuesses(0);
        setCurrState("");
        alert("Sorry! You lost :(");
      }
    }
    setGuess("");
  }
  return (
    <div className="container">
      {!word && (
        <button
          onClick={() => {
            fetch("https://random-word-api.herokuapp.com/word")
              .then((res) => res.json())
              .then((word) => {
                console.log(word[0]);
                setWord(word[0]);
                setNumGuesses(0);

                var temp = [];
                for (var i = 0; i < word[0].length; i++) {
                  temp.push("_ ");
                }
                setCurrState(temp);
              });
          }}
        >
          Play new game
        </button>
      )}
      {word && (
        <div className="container game">
          <div>
            <img src={require(`./images/stage${numGuesses}.png`)} />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              style={{ marginRight: 10 }}
              type="text"
              placeholder="Guess"
              value={guess}
              onChange={(event) => {
                setGuess(event.target.value);
              }}
            />
            <button
              onClick={() => {
                checkGuess(guess);
              }}
            >
              Guess
            </button>
          </div>
          <div>
            <text>{currState}</text>
          </div>
        </div>
      )}
    </div>
  );
}

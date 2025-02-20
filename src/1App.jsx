import React, { useState } from "react";

const generateTask = () => {
  const factor = Math.floor(Math.random() * 10) + 1;
  const multiplier = Math.floor(Math.random() * 10) + 1;
  return { factor, multiplier };
};

export default function MultiplicationTrainer() {
  const [task, setTask] = useState(generateTask());
  const [message, setMessage] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [history, setHistory] = useState([]);

  const handleAnswer = (selectedMultiplier) => {
    if (selectedMultiplier === task.multiplier) {
      const result = `${task.factor} + `.repeat(task.multiplier).slice(0, -2) + ` = ${task.factor * task.multiplier} ( ${task.multiplier} • ${task.factor} = ${task.factor * task.multiplier} )`;
      setHistory([result, ...history]);
      setMessage("Richtig!");
      setShowNext(true);
    } else {
      setMessage("Versuche es nochmal.");
    }
  };

  const handleNextTask = () => {
    setTask(generateTask());
    setMessage("");
    setShowNext(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: '#ffffff', padding: '16px', color: '#000000', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Multiplikations-Übung</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${task.factor}, auto)`, gap: '4px', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
        {[...Array(task.multiplier * task.factor)].map((_, index) => (
          <span key={index} style={{ fontSize: '24px' }}>🍏</span>
        ))}
      </div>
      <p style={{ fontSize: '18px', marginBottom: '16px', color: '#000000' }}>{`${task.factor} + `.repeat(task.multiplier).slice(0, -2)} = ?</p>
      <p style={{ fontSize: '18px', marginBottom: '16px', color: '#000000' }}>x • {task.factor} = ?</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {[...Array(10).keys()].map((num) => (
          <button
            key={num + 1}
            style={{ padding: '16px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
            onClick={() => handleAnswer(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
      {message && <p style={{ marginTop: '16px', fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>{message}</p>}
      {showNext && <button onClick={handleNextTask} style={{ marginTop: '16px', padding: '12px', fontSize: '18px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Nächste Aufgabe</button>}
      <div style={{ marginTop: '20px', textAlign: 'left', color: '#000000' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Aufgabenverlauf:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} style={{ fontSize: '14px', color: '#000000' }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

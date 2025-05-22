import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "20px auto", padding: "0 15px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Personal Finance Tracker</h1>

      <TransactionForm onAddTransaction={addTransaction} />

      <section>
        <h2>Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((t, index) => (
              <li key={index}>
                <strong>{t.type.toUpperCase()}</strong> | ${t.amount.toFixed(2)} | {t.category} | {t.date}
                {t.notes && ` | Notes: ${t.notes}`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;

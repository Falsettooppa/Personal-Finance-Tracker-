import React from "react";
import "./TransactionList.css";

function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p style={{ textAlign: "center" }}>No transactions yet.</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t, i) => (
        <li key={i}>
          <span className={t.type === "income" ? "transaction-type-income" : "transaction-type-expense"}>
            {t.type.toUpperCase()}
          </span>
          <span>${t.amount.toFixed(2)}</span>
          <span>{t.category}</span>
          <span>{t.date}</span>
          {t.notes && <span>Notes: {t.notes}</span>}
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;

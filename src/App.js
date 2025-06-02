import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryChart from "./components/SummaryChart";
import ExportCSV from "./components/ExportCSV";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const filteredTransactions = transactions
    .filter((t) => (typeFilter === "all" ? true : t.type === typeFilter))
    .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      return new Date(b.date) - new Date(a.date);
    });

  const uniqueCategories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "20px auto", padding: "0 15px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Personal Finance Tracker</h1>

      <TransactionForm onAddTransaction={addTransaction} />

      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
          <SummaryChart transactions={filteredTransactions} />
        </div>
        <div style={{ flexShrink: 0 }}>
          <ExportCSV transactions={filteredTransactions} />
        </div>
      </div>

      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setShowTransactions(!showTransactions)}>
          {showTransactions ? "Hide Transactions" : "Show Transactions"}
        </button>
      </div>

      
      {showTransactions && (
        <section>
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>Transactions</h2>
          <TransactionList transactions={filteredTransactions} />
        </section>
      )}
    </div>
  );
}

export default App;

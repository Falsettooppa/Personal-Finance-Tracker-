// import React, { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Transactions({ transactions, addTransaction, filteredTransactions, filters }) {
  const { typeFilter, setTypeFilter, categoryFilter, setCategoryFilter, sortBy, setSortBy, uniqueCategories } = filters;

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm onAddTransaction={addTransaction} />
      
      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default Transactions;

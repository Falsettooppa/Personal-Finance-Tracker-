import React from "react";
import SummaryChart from "../components/SummaryChart";

function Dashboard({ transactions }) {
  // Calculate totals
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = incomeTotal - expenseTotal;

  // Last 5 transactions sorted newest first
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>

      {/* Summary Chart with fixed max height */}
      <SummaryChart transactions={transactions} maxHeight={250} />

      {/* Summary Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={summaryBoxStyle}>
          <h3>Total Income</h3>
          <p style={{ color: "#4caf50", fontWeight: "bold" }}>
            ₦{incomeTotal.toLocaleString()}
          </p>
        </div>
        <div style={summaryBoxStyle}>
          <h3>Total Expenses</h3>
          <p style={{ color: "#f44336", fontWeight: "bold" }}>
            ₦{expenseTotal.toLocaleString()}
          </p>
        </div>
        <div style={summaryBoxStyle}>
          <h3>Net Balance</h3>
          <p
            style={{
              color: netBalance >= 0 ? "#4caf50" : "#f44336",
              fontWeight: "bold",
            }}
          >
            ₦{netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center" }}>Recent Transactions</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style={{ textAlign: "right" }}>Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((t, idx) => (
                  <tr key={idx} style={idx % 2 === 0 ? rowEven : rowOdd}>
                    <td>{t.date}</td>
                    <td>{t.notes}</td>
                    <td>{t.category}</td>
                    <td>{t.type}</td>
                    <td style={{ textAlign: "right" }}>
                      {t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                    No transactions to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const summaryBoxStyle = {
  backgroundColor: "#f5f5f5",
  padding: "15px",
  borderRadius: "8px",
  flex: "1",
  minWidth: "150px",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  fontSize: "0.9rem",
};

const rowEven = {
  backgroundColor: "#fafafa",
};

const rowOdd = {
  backgroundColor: "#ffffff",
};

export default Dashboard;

import React from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ transactions }) {
  const headers = [
    { label: "Type", key: "type" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Date", key: "date" },
    { label: "Notes", key: "notes" },
  ];

  return (
    <div style={{ textAlign: "right", marginTop: "20px" }}>
      <CSVLink
        data={transactions}
        headers={headers}
        filename={"personal-finance-transactions.csv"}
        className="btn"
        style={{
          padding: "10px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          display: "inline-block",
          minWidth: "140px",
          textAlign: "center",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Export CSV
      </CSVLink>
    </div>
  );
}

export default ExportCSV;

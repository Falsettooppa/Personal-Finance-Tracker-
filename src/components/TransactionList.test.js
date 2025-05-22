import { render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList";

test("renders transactions list correctly", () => {
  const transactions = [
    {
      type: "income",
      amount: 50,
      category: "Salary",
      date: "2024-01-01",
      notes: "Test note",
    },
    {
      type: "expense",
      amount: 30,
      category: "Food",
      date: "2024-01-02",
      notes: "",
    },
  ];

  render(<TransactionList transactions={transactions} />);

  expect(screen.getByText(/income/i)).toBeInTheDocument();
  expect(screen.getByText(/\$50.00/)).toBeInTheDocument();

  expect(screen.getByText(/expense/i)).toBeInTheDocument();
  expect(screen.getByText(/\$30.00/)).toBeInTheDocument();
});
test("renders no transactions message", () => {
  render(<TransactionList transactions={[]} />);

  expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
});
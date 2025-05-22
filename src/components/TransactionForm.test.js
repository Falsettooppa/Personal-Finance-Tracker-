import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "./TransactionForm";

test("renders TransactionForm and submits data", () => {
  const mockAdd = jest.fn();

  render(<TransactionForm onAddTransaction={mockAdd} />);

  // Adjust selectors if needed based on your form labels/placeholders
  const amountInput = screen.getByLabelText(/amount/i);
  expect(amountInput).toBeInTheDocument();

  const dateInput = screen.getByLabelText(/date/i);
  expect(dateInput).toBeInTheDocument();

  // Fill form inputs
  fireEvent.change(amountInput, { target: { value: "100" } });
  fireEvent.change(dateInput, { target: { value: "2024-01-01" } });

  // Submit form
  fireEvent.click(screen.getByText(/add transaction/i));

  expect(mockAdd).toHaveBeenCalled();
});
test("validates required fields", () => {
  const mockAdd = jest.fn();

  render(<TransactionForm onAddTransaction={mockAdd} />);

  // Submit form without filling inputs
  fireEvent.click(screen.getByText(/add transaction/i));

  // Check for validation messages
  expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
  expect(screen.getByText(/date is required/i)).toBeInTheDocument();
});
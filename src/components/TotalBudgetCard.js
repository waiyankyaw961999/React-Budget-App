import BudgetCard from "./BudgetCard";

import { useBudgets } from "./contexts/BudgetsContext";

export default function UncategorizedBudgetCard(props) {
  const { expenses, budgets } = useBudgets();

  const max = budgets.reduce(
    (total, budget) => total + parseInt(budget.max),
    0
  );

  const amount = expenses.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  if (max === 0) return null;
  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
}

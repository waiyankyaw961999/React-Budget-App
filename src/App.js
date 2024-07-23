import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "./components/contexts/BudgetsContext";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setAddExpenseModalBudgetId(budgetId);
    setShowAddExpenseModal(!showAddExpenseModal);
  };

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button
          onClick={() => setShowAddBudgetModal(!showAddBudgetModal)}
          variant="primary"
        >
          Add Budget
        </Button>
        <Button
          onClick={() => setShowAddExpenseModal(!showAddExpenseModal)}
          variant="outline-primary"
        >
          Add Expense
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + parseInt(expense.amount),
            0,
          );
          return (
            <BudgetCard
              key={budget.id}
              hideButtons={false}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
          hideButtons={false}
        />
        <TotalBudgetCard hideButtons={true} />
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => {
          setViewExpenseModalBudgetId();
        }}
      />
    </Container>
  );
}

export default App;

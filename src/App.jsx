import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { expenseDetails } from '../data/expenseDetails'
function App() {
  const [expenseData, setExpenseData] = useState(expenseDetails)

  return (
    <>
    <h1>Track Your Expense</h1>
      <main className="main-container">
        <ExpenseForm setExpense={setExpenseData}/>
        <ExpenseTable expense={expenseData}/>
      </main>
    </>
  )
}

export default App

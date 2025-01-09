import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { expenseDetails } from '../data/expenseDetails'
import { useLocalStorage } from '../src/hooks/useLocalStorage';

function App() {
  const [expenseData, setExpenseData] = useLocalStorage('expenseData', expenseDetails)

  const [expenses, setExpenses] = useState({
    title: '',
    category: '',
    amount: ''
  })

  const [editingId, setEditingId] = useState('')

  return (
    <>
      <h1>Track Your Expense</h1>
      <main className="main-container">
        <ExpenseForm setEditingId={setEditingId} editingId={editingId} setExpense={setExpenseData} setExpenses={setExpenses} expenses={expenses} />
        <ExpenseTable setEditingId={setEditingId} editingId={editingId} expense={expenseData} setExpenseData={setExpenseData}  setExpenses={setExpenses}/>
      </main>
    </>
  )
}

export default App

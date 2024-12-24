import React, { useState } from 'react'

export default function ExpenseForm({ setExpense }) {

    const [expenses, setExpenses] = useState({
        title: '',
        category: '',
        amount: ''
    })

    // const [title, setTitle] = useState('')
    // const [category, setCategory] = useState('')
    // const [amount, setAmount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // const expense = { title, category, amount, id:crypto.randomUUID() }

        setExpense((prev) => [...prev, { ...expenses, id: crypto.randomUUID() }])

        setExpenses({
            title: '',
            category: '',
            amount: ''
        })
    }



    const handelChange = (e) => {
        const {name, value} = e.target
        setExpenses((prev) => (
            {
                ...prev,
                [name]: value
            })

        )
    }


    return (
        <div className='expense-form-container'>
            <form
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' value={expenses.title} onChange={handelChange} />
                </div>
                <div className="row">
                    <label htmlFor="category">Category</label>
                    <select name='category' value={expenses.category} onChange={handelChange}>
                        <option value="" hidden>
                            Select Category
                        </option>
                        <option value="grocery">Grocery</option>
                        <option value="clothes">Clothes</option>
                        <option value="medicine">Medicine</option>
                        <option value="bills">Bills</option>
                        <option value="education">Education</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name='amount' value={expenses.amount} onChange={handelChange} />
                </div>
                <div className="row">
                    <button type='submit' >Add</button>
                </div>
            </form>
        </div>
    )
}

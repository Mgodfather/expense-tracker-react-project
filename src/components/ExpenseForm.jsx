import React from 'react'

export default function ExpenseForm({ setExpense }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const expense = { ...getFormData(e.target), id: crypto.randomUUID() }

        setExpense((prev) => [...prev, expense])

        e.target.reset()
    }

    const getFormData = (form) => {
        const formData = new FormData(form)
        const data = {}
        for (const [key, value] of formData) {
            data[key] = value
        }
        return data
    }

    return (
        <div className='expense-form-container'>
            <form
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' />
                </div>
                <div className="row">
                    <label htmlFor="category">Category</label>
                    <select name='category'>
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
                    <input type="text" name='amount' />
                </div>
                <div className="row">
                    <button type='submit' >Add</button>
                </div>
            </form>
        </div>
    )
}

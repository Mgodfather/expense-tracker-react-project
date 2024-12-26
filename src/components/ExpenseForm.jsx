import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function ExpenseForm({ setExpense }) {

    const [expenses, setExpenses] = useState({
        title: '',
        category: '',
        amount: ''
    })

    const [error, setError] = useState({})

    const validate = (formData) => {

        const errorData = {}


        if (!formData.title) {
            errorData.title = 'Title is required'
        }

        if (!formData.category) {
            errorData.category = 'category is required'
        }

        if (!formData.amount) {
            errorData.amount = 'amount is required'
        }

        setError(errorData)
        return errorData
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const validateResult = validate(expenses)

        if (Object.keys(validateResult).length) {
            toast.warning('Please fill All required fields')
            return
        }


        setExpense((prev) => [...prev, { ...expenses, id: crypto.randomUUID() }])

        setExpenses({
            title: '',
            category: '',
            amount: ''
        })
    }



    const handelChange = (e) => {
        const { name, value } = e.target
        setExpenses((prev) => (
            {
                ...prev,
                [name]: value
            })

        )
        
        setError({})
    }


    return (
        <>
            <div className='expense-form-container'>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' value={expenses.title} onChange={handelChange} />
                        <p>{error.title}</p>
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
                        <p>{error.category}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" name='amount' min={0} value={expenses.amount} onChange={handelChange} />
                        <p>{error.amount}</p>
                    </div>
                    <div className="row">
                        <button type='submit' >Add</button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

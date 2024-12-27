import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Input from './Input';
import SelectMenu from './SelectMenu';


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

                    <Input
                        name='title'
                        type='text'
                        value={expenses.title}
                        onChange={handelChange}
                        error={error.title}
                        id='title'
                        label='Title'
                    />

                    <SelectMenu
                        options={['Grocery', 'Clothes', 'Medicine', 'Bills', 'Education']}
                        label='Category'
                        defaultOption='Select Category'
                        name='category'
                        value={expenses.category}
                        onChange={handelChange}
                        id='category'
                        error={error.category}
                    />

                    <Input
                        min={0}
                        name='amount'
                        type='number'
                        value={expenses.amount}
                        onChange={handelChange}
                        error={error.amount}
                        id='amount'
                        label='Amount'
                    />

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

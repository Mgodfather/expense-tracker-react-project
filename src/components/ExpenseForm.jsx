import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Input from './Input';
import SelectMenu from './SelectMenu';


export default function ExpenseForm({ setExpense, setExpenses, expenses, editingId, setEditingId }) {

    const [error, setError] = useState({})

    const validateConfig = {
        title: [
            { required: true, message: "Please enter Title" },
            { minLength: 5, message: 'Title Should be at least 5 character long' }
        ],
        category: [
            { required: true, message: "Please Select Category" }
        ],
        amount: [
            { required: true, message: "Please enter Amount" },
            { minLength: 0, message: 'Amount cannot be 0' }
        ]
    }


    const validate = (formData) => {
        const errorData = {}

        Object.entries(formData).forEach(([key, value]) => {
            validateConfig[key].some((rule) => {
                if (rule.required && !value) {
                    errorData[key] = rule.message
                    return true
                }

                if ((rule.minLength > value.length) || parseInt(value) === rule.minLength) {
                    errorData[key] = rule.message
                    return true
                }
            })
        })

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



        console.log(editingId);

        if (editingId) {
            setExpense((prevData) => (
                prevData.map((el) => {
                    if (el.id === editingId) {
                        return {
                            ...expenses, id: editingId
                        }
                    } else {
                        return el
                    }
                })
            ))
            setEditingId('')
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
                        <button type='submit' >{editingId ? 'Save' : 'Add'} </button>
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

import React, { useState } from 'react'

export default function ExpenseTable({ expense }) {
    // const [filteredExpense, setFilteredExpense] = useState([])
    // const selectChange = (e) => {
    //     setFilteredExpense(expense.filter((exp) => exp.category === e.target.value));
    // }


    
    
    return (
        <div className='expense-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            <select onChange={selectChange}>
                                <option value="" hidden >
                                    All
                                </option>
                                <option value="Grocery">Grocery</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Bills">Bills</option>
                                <option value="Education">Education</option>
                            </select>
                        </th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expense.map(({ id, title, category, amount }) => (
                            <tr key={id}>
                                <td>{title}</td>
                                <td>{category}</td>
                                <td>{amount}</td>
                            </tr>
                        ))}
                    <tr className="total-row">
                        <td>Total</td>
                        <td></td>
                        <td>Rs {expense.reduce((total, acc) => total + parseInt(acc.amount), 0)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

import React from 'react'

export default function ExpenseTable({ expense }) {
    return (
        <div className='expense-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            <select>
                                <option value="" hidden>
                                    All
                                </option>
                                <option value="grocery">Grocery</option>
                                <option value="clothes">Clothes</option>
                                <option value="medicine">Medicine</option>
                                <option value="bills">Bills</option>
                                <option value="education">Education</option>
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
                        <td>rs 5000</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

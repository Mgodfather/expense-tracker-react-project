import React, { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'

export default function ExpenseTable({ expense, setExpenseData, setExpenses, setEditingId }) {
    const [filteredData, setQuery] = useFilter(expense, (data) => data.category)
    const [positions, setPositions] = useState({
        top: '',
        left: ''
    })
    const [dataForUpdate, setDataForUpdate] = useState({})

    return (
        <>
            <ContextMenu setExpenseData={setExpenseData} 
            setExpenses={setExpenses} 
            positions={positions} 
            setPositions={setPositions} 
            dataForUpdate={dataForUpdate} 
            setEditingId={setEditingId}
            />
            <div className='expense-table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>
                                <select onChange={(e) => setQuery(e.target.value)}>
                                    <option value="" >
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
                            filteredData.length ?

                                filteredData.map(({ id, title, category, amount }) => (
                                    <tr key={id}
                                        onClick={() => setPositions({})}
                                        onContextMenu={(e) => {
                                            e.preventDefault()
                                            setPositions({
                                                top: e.clientY + 4,
                                                left: e.clientX + 4
                                            })
                                            const dataForEdit = filteredData.find((data) => data.id === id)
                                            setDataForUpdate(dataForEdit)
                                        }}>
                                        <td>{title}</td>
                                        <td>{category}</td>
                                        <td>{amount}</td>
                                    </tr>
                                ))

                                : <tr><td>No records found</td></tr>
                        }
                        <tr className="total-row">
                            <td>Total</td>
                            <td></td>
                            <td>Rs {filteredData.reduce((total, acc) => total + parseInt(acc.amount), 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

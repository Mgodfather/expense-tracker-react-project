import React, { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'
import 'boxicons'

export default function ExpenseTable({ expense, setExpenseData, setExpenses, setEditingId }) {
    const [filteredData, setQuery] = useFilter(expense, (data) => data.category)
    const [positions, setPositions] = useState({
        top: '',
        left: ''
    })
    const [dataForUpdate, setDataForUpdate] = useState({})


    const [sortCallback, setSortCallback] = useState(() => () => {})

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
                <table onClick={() => {
                    if (positions.left) {
                        setPositions({});
                    }
                }}>
                    <thead>
                        <tr>
                            <th>
                                <div className='icon-container'>
                                    <span>Title</span>
                                    <span className='down-arrow'><box-icon name='sort-a-z' onClick={() => setSortCallback(() => (a, b) => a.title.localeCompare(b.title))} ></box-icon></span>
                                </div>
                            </th>
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
                            <th>
                                <div className='icon-container'>
                                    <span>Amount</span>
                                    <span className='up-arrow'><box-icon type='solid' name='up-arrow-alt'
                                        onClick={(e) => setSortCallback(() => (a, b) => b.amount - a.amount)}></box-icon></span>
                                    <span className='down-arrow'><box-icon type='solid' name='down-arrow-alt'
                                        onClick={(e) => setSortCallback(() => (a, b) => a.amount - b.amount)}
                                    ></box-icon></span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length ?

                                filteredData.sort(sortCallback).map(({ id, title, category, amount }) => (
                                    <tr key={id}
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
                            <td style={{cursor:'pointer'}} onClick={() => setSortCallback(() => () => {})} >Clear sort</td>
                            <td>Rs {filteredData.reduce((total, acc) => total + parseInt(acc.amount), 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

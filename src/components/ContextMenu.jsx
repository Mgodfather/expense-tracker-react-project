import React from 'react'

export default function ContextMenu({ positions, setPositions, dataForUpdate, setExpenseData, setExpenses, setEditingId }) {
    if (!positions.top) return

    return (
        <div onClick={() => setPositions({})} className='context-menu' style={positions}>
            <button onClick={() => {
                setExpenses({
                    title: dataForUpdate.title,
                    category: dataForUpdate.category,
                    amount: dataForUpdate.amount
                })

                setEditingId(dataForUpdate.id)
                
            }}>Edit</button>
            <button onClick={() => {
                setExpenseData((prev) => (
                    prev.filter((data) => data.id !== dataForUpdate.id)
                ))
            }}>Delete</button>
        </div>
    )
}

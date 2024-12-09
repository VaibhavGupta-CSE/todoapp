import React, { useState, useEffect } from 'react'
import '../style.css'

const Todo = () => {
  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('data')) || []
  )
  const [isEditItem, setisEditItem] = useState('')
  const [toggleButton, setToggleButton] = useState(false)
  const addItem = () => {
    if (!inputData) alert('Please enter some data')
    else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData }
          }
          return curElem
        })
      )
      setInputData('')
      setisEditItem(null)
      setToggleButton(false)
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData])
      setInputData('')
    }
  }

  const editItem = (index) => {
    const search = items.find((curElem) => {
      return curElem.id === index
    })
    setInputData(search.name)
    setisEditItem(index)
    setToggleButton(true)
  }

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index
    })
    setItems(updatedItem)
  }

  const removeAll = () => {
    setItems([])
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img
              width='64'
              height='64'
              src='https://img.icons8.com/nolan/64/todo-list.png'
              alt='todo-list'
            />
            <figcaption>Add your list Here 😊</figcaption>
          </figure>
          <div className='addItems'>
            <input
              type='text'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className='form-control'
              placeholder='Add Item'
            />
            {toggleButton ? (
              <i className='far fa-edit add-btn' onClick={addItem}></i>
            ) : (
              <i className='fa fa-plus add-btn' onClick={addItem}></i>
            )}
          </div>
          <div className='showItems'>
            {items &&
              items.map((curElem) => {
                return (
                  <div className='eachItem' key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className='todo-btn'>
                      <i
                        className='far fa-edit add-btn'
                        onClick={() => editItem(curElem.id)}
                      ></i>
                      <i
                        className='far fa-trash-alt add-btn'
                        onClick={() => deleteItem(curElem.id)}
                      ></i>
                    </div>
                  </div>
                )
              })}
          </div>
          {items.length > 0 && (
            <div className='showItems'>
              <button
                className='btn effect04'
                onClick={removeAll}
                data-sm-link-text='Remove All'
              >
                <span>CHECKLIST</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Todo

import React, { useCallback, useEffect, useState } from 'react'

const List = ({getItems}) => {

    const [items,setItems] = useState([])
    useEffect(() => {   
        setItems(getItems(3))
        console.log("Updating Items")
    }, [getItems])

  return items.map((item, index) => <div key={index}>{item}</div>)
}

const UseCallbackDemo = () => {

    const [number, setNumber] = useState(1)
    const [dark, setDark] = useState(false)

    const getItems = useCallback((incrementor) => {
        return [incrementor + number, number + 1 + incrementor, number + 2 + incrementor]
    }, [number])

    const themeStyles = useCallback(() => ({
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black'
    }), [dark]);

    useEffect(() => {
        console.log("Theme Changed")
    }, [themeStyles])

    return (
        <div>
            <h2>UseCallBack Demo :</h2>
            <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
            <div style={themeStyles()}>
                <button onClick={() => setDark(prevDark => !prevDark)}> Change Theme</button>
                <List getItems={getItems} />
            </div>
        </div>
    )
}

export default UseCallbackDemo
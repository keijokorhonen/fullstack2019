import React, { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
    background: #368785;
    border-radius: 3px;
    padding: 1em;
    color: #ffffff;
    border: none;
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    &:hover {
            background-color: #26605f;
    }
`

const CancelButton = styled.button`
    background: #ba2746;
    border-radius: 3px;
    padding: 1em;
    color: #ffffff;
    border: none;
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    &:hover {
            background-color: #e0506f;
    }
`

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
            </div>
        </div>
    )
}

export default Toggleable
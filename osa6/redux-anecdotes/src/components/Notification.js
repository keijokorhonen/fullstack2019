import React from 'react';

const Notification = (props) => {
  const { notification } = props.store.getState()
  const style = notification !== null
    ? {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    : {
      display: 'none'
    }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

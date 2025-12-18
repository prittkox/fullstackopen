const AlertBox = ({ text, variant }) => {
  if (text === null) {
    return null
  }

  return (
    <div className={variant}>
      {text}
    </div>
  )
}

export default AlertBox

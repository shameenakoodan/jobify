
const FormRow = ({type,labelText,defaultValue}) => {
  return (
    <div className="form-row">
          <label htmlFor={name} className="form-label">
            {labelText || name}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            className="form-input"
            defaultValue={defaultValue || ''}
            required
          ></input>
        </div>
  )
}

export default FormRow
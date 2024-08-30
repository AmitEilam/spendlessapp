function FormInput({ label, type, value, onChange, required }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder='Type here ...'
        value={value}
        onChange={onChange}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        required={required}
      />
    </>
  );
}

export default FormInput;

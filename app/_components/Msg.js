function Msg({ children }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='m-5 font-medium border p-7 bg-white rounded-xl shadow'>
        {children}
      </p>
    </div>
  );
}

export default Msg;

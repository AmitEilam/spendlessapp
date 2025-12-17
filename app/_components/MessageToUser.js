function MessageToUser({ children }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='m-5 font-medium border dark:border-gray-700 p-7 bg-white dark:bg-gray-800 rounded-xl shadow'>
        {children}
      </p>
    </div>
  );
}

export default MessageToUser;

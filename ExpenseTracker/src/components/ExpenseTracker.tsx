import { useState } from 'react';

interface Transaction {
  timestamp: string;
  amount: number;
}


const ExpenseTracker = () => {
  const [balance, setBalance] = useState<number>(100);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [amountInput, setAmountInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  //Error Handle 
  const addTransaction = (): void => {
    if (amountInput === '') {
      setErrorMessage('Please enter a number.');
      return;
    }
   //get the input and update the new Balance
   //-------------------------------------------------------
    const amount: number = parseFloat(amountInput);
    if (!isNaN(amount)) {
      const newBalance: number = balance + amount;
      const timestamp: string = new Date().toLocaleString();
      const transaction: Transaction = { timestamp, amount };
      setTransactionHistory([...transactionHistory, transaction]);
      setBalance(newBalance);
      setAmountInput('');
      setErrorMessage('');
    }
  };
  //--------------------------------------------------------

  const subtractTransaction = (): void => {
    if (amountInput === '') {
      setErrorMessage('Please enter a number.');
      return;
    }

    //get the input for remove and upate the state
    //------------------------------------------------
    const amount: number = parseFloat(amountInput);
    if (!isNaN(amount)) {
      const newBalance: number = balance - amount;
      const timestamp: string = new Date().toLocaleString();
      const transaction: Transaction = { timestamp, amount: -amount };
      setTransactionHistory([...transactionHistory, transaction]);
      setBalance(newBalance);
      setAmountInput('');
      setErrorMessage('');
    }
  };
  //----------------------------------------------------------
//Display the Transaction Details 
  const displayTransactionHistory = (): void => {
    console.log(transactionHistory);
  };

  return (
    <div>
    <div className='header'>
      <h1>Expense Tracker</h1>
      <p>Current Balance: {balance}</p>
      <div>
        <label>
          Amount:
          <input type="number" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
        </label>
        <button onClick={addTransaction}>Add</button>
        <button onClick={subtractTransaction}>Remove</button>
         <p>{errorMessage}</p>
         </div>
      </div>
     <div id='footer'> 
      <button onClick={displayTransactionHistory}>Display Transaction History</button>
      <ol>
        {transactionHistory.map((transaction: Transaction, index: number) => (
          <li key={index}>
            <div>Date: {transaction.timestamp} Amount: {transaction.amount}</div><br/>
           
          </li>
        ))}
      </ol>
    </div>
    </div>
  );
};

export default ExpenseTracker;

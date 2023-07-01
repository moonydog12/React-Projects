// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from 'react';
import { useState } from 'react';

const countries = ['USD', 'EUR', 'CAD', 'INR'];

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');
  const [converted, setConverted] = useState('');

  useEffect(() => {
    async function convert() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
    }

    if (fromCur === toCur) return setConverted(amount);
    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input type="text" value={amount} onChange={(e) => setAmount(+e.target.value)} />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        {countries.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        {countries.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <p>{converted}</p>
    </div>
  );
}

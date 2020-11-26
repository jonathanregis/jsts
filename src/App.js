import React, { useState } from 'react';
import './assets/css/App.css';
 
function App(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // button click action
  const handleLogin = () => {
    //validation first, I would normally do a more complex validation function and import as a module
    if(username.value == '' || password.value == '') setError("Please provide your password and username");
    const apiUrl = "https://5fc00fbffd14be0016749759.mockapi.io/api/users";
    fetch(apiUrl,{
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({username: username.value,password: password.value})
    })
    .then(result => result.json())
    .then(json => {
      setResult(json);
      console.log(json);
    })
  }
 
  return (
    <div className="App">
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      {result?.success && <><small style={{ color: result.success ? 'green' : 'red' }}>{result.message}</small><br /></>}
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default App;
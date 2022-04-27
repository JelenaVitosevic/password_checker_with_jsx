function SubmitForm({function1, inputValue, function2}) {

    return (
      <div className='input_container'>
          <input id='input' type="text" placeholder='insert password' onChange={function1} value={inputValue}/>
          <button id='button' onClick={function2}>Click</button>
      </div>
    )
  }

  function Table({answer}) {
    const textTable = ['velika slova', 'mala slova', 'brojevi', 'specijalni karakteri'];
    
  
    return (
      <div className='table_wrapper'>
          <table id='table'>
              <tbody>
                  <tr>{textTable.map((text) => {
                      return (
                              <th key={textTable.indexOf(text)}>{text}</th>
                      )
                  })}
                  </tr>
                  <tr>
                      {answer? Object.keys(answer).map((item, i) => {
                          return (<td key={i}>{answer[item]}</td>)
                      }) : <React.Fragment><td>0</td><td>0</td><td>0</td><td>0</td></React.Fragment>}
                  </tr>
              </tbody>
          </table>
      </div>
    )
  }

  
  function App() {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [sums, setSums] = React.useState();
  
    const getPassword = (e) => setPasswordValue(e.target.value);
   
    const handleClickFetch = async () => {
      const dataToSend = {
          password: passwordValue
      }
      const checkPassword = await fetch('http://localhost:3300/passwordChecker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      const content = await checkPassword.json();
  
      setSums(content);
      console.log(sums)
    }
  
    return (
      <div className="container">
        <h1 className="content_title">PASSWORD STRENGTH CHECKER</h1>
        <SubmitForm function1={getPassword} inputValue={passwordValue} function2={handleClickFetch}/>
        <Table answer={sums}/>
      </div>
    );
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
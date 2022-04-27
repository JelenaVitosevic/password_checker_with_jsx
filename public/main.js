function SubmitForm({ function1, inputValue, function2 }) {

  return React.createElement(
    'div',
    { className: 'input_container' },
    React.createElement('input', { id: 'input', type: 'text', placeholder: 'insert password', onChange: function1, value: inputValue }),
    React.createElement(
      'button',
      { id: 'button', onClick: function2 },
      'Click'
    )
  );
}

function Table({ answer }) {
  const textTable = ['velika slova', 'mala slova', 'brojevi', 'specijalni karakteri'];

  return React.createElement(
    'div',
    { className: 'table_wrapper' },
    React.createElement(
      'table',
      { id: 'table' },
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          textTable.map(text => {
            return React.createElement(
              'th',
              { key: textTable.indexOf(text) },
              text
            );
          })
        ),
        React.createElement(
          'tr',
          null,
          answer ? Object.keys(answer).map((item, i) => {
            return React.createElement(
              'td',
              { key: i },
              answer[item]
            );
          }) : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'td',
              null,
              '0'
            ),
            React.createElement(
              'td',
              null,
              '0'
            ),
            React.createElement(
              'td',
              null,
              '0'
            ),
            React.createElement(
              'td',
              null,
              '0'
            )
          )
        )
      )
    )
  );
}

function App() {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [sums, setSums] = React.useState();

  const getPassword = e => setPasswordValue(e.target.value);

  const handleClickFetch = async () => {
    const dataToSend = {
      password: passwordValue
    };
    const checkPassword = await fetch('http://localhost:3300/passwordChecker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
    const content = await checkPassword.json();

    setSums(content);
    console.log(sums);
  };

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'h1',
      { className: 'content_title' },
      'PASSWORD STRENGTH CHECKER'
    ),
    React.createElement(SubmitForm, { function1: getPassword, inputValue: passwordValue, function2: handleClickFetch }),
    React.createElement(Table, { answer: sums })
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));

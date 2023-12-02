(function () {
  fetch('/current')
  .then((response) => response.json())
  .then((data) => {
    const htmlText = 
    `<p>First Name: ${data.first_name}</p>
    <p>Last Name: ${data.last_name}</p>
    <p>Email: ${data.email}</p>`
    const span = document.getElementById('spanProfile');
    span.innerHTML = htmlText;
  })
  .catch((error) => {
    console.error('error', error)
  })
  
})();
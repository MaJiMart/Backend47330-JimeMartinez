(function () {
  document.getElementById('formRecover').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      email: document.getElementById('inputEmail').value
    };
    fetch('api/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Check your email')
        window.location.href = '/index.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})();

(function () {
  document.getElementById('formNewPass').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      newPass: document.getElementById('newPass').value
    };
    fetch('api/recover-password/:token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/index.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})();
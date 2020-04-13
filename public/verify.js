Sentry.init({ dsn: 'https://8aa2654fc3e54040918cd44ee0fba683@o376518.ingest.sentry.io/5197417' });

const button = document.getElementById('verifybtn');
button.addEventListener('click', function(e) {

  $('#loadingModal').modal('show')

  const urlParams = new URLSearchParams(window.location.search);

  var data = new URLSearchParams();
data.append('id', urlParams.get('id'));

  fetch('/verify', {method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded'}, body: data.toString()})
    .then(function(response) {
      if(response.ok) {

        $('#loadingModal').modal('hide')

        window.location.replace("https://helsinkicruises.web.app/verified.html");

        return;
      } else {

        $('#loadingModal').modal('hide')
        alert("I couldn't find that verification code in your description or status. Try clicking the verify button a few more times, or double-check you've pasted and saved the code correctly.")

      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      alert("I couldn't find that verification code in your description or status. Try clicking the verify button a few more times, or double-check you've pasted and saved the code correctly.")

      $('#loadingModal').modal('hide')
      console.log(error);
    });
});

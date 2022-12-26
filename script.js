const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;

try {
  const recognition = new recognitionSvc();
} catch(error) {
  document.getElementById('transcription').innerHTML = `<p>This browser does not support speech recognition API. Please, use another one (Google Chrome recommended)</p>`;
}

const recognition = new recognitionSvc();
document.querySelector('#start').addEventListener('click', ()=>{
  const startBtn = document.querySelector('#start');
  recognition.lang = document.querySelector('#lang').value || 'en-GB';
  recognition.continuous = true;

  recognition.onresult = (event) => {
    const accumulatedResult = [];
    for (const result of event.results) accumulatedResult.push(`${result[0].transcript}`);

    document.querySelector('#transcription').innerHTML = accumulatedResult;
  };

  if(startBtn.classList.contains('listening')) recognition.stop();
  else recognition.start();

  startBtn.classList.toggle('listening');
});

document.querySelector('#transcription').addEventListener('click', (e) => {
  navigator.clipboard.writeText(e.target.innerText).then( () => {
      Toastify({
        text: "Copied to clipboard",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
    setTimeout( () => {
      document.getElementById('tooltip').classList.remove('active');
    }, 3100);
  });
});

setTimeout(() => {
    Toastify({
        text: "Use '📋' to copy text",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}, 3100);
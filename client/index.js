[
  'Components/Component.js',
  'Components/BetBox.js',
].forEach(url => {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);  
})
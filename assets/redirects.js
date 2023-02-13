var newRedirects = [
  {"from": ["360050971771"],"to": "4406429578269"},
  {"from": ["6020370318365"],"to": "8595074429469"},
  {"from": ["6020594187549"],"to": "8637955941661"},
  {"from": ["360019244457"],"to": "4406429578269"},
  {"from": ["4406436488093"],"to": "360051052211"},
  {"from": ["5161970470941"],"to": "4406429578269"},
  {"from": ["6434081936541", "6486686533149"],"to": "6739198496413"}
];

// Do not change
for (var i = 0; i < newRedirects.length; i++) {
  var j = newRedirects[i];

  for (var k = 0; k < j['from'].length; k++) {
      if (window.location.href.indexOf(j['from'][k]) > -1) {
          window.location.href = 'https://support.portal.exclaimer.com/hc/en-gb/articles/' + j["to"]; 
      }
  }
}
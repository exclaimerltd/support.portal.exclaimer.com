var newRedirects = [
  {"from": ["360050971771"],"to": "4406429578269"},
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
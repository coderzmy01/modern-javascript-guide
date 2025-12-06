const userName = prompt('What is your name?');
userName == 'Admin' ? alert('Hello') : !!userName ? alert("I don't know you") : alert('canceled');
if (userName == 'Admin') {
  const password = prompt('What is your password?');
  password == '<PASSWORD>' ? alert('Welcome') : alert('Wrong password');
}

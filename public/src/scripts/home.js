
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openGameTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function A2()
{
    var newpass = document.getElementById("rpsw").value;
    var prevpass = document.getElementById("spsw").value;
    if(newpass!=prevpass)
    { document.getElementById('wrongPass').innerHTML ='Password is not same as New password' ;
    document.getElementById("sign_in").disabled = true;}
    else
    { document.getElementById('wrongPass').innerHTML ='Password matched' ;
    document.getElementById("sign_in").disabled = false;}
 }


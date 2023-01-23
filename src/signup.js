let logo = document.getElementById("logo")
logo.onclick = ()=>{
  location.href = "/index.html"
}


let signupform = document.getElementById("signupform");
signupform.addEventListener("submit", async (event) => {
  event.preventDefault();
  let email = signupform.signupemail.value;
  let password = signupform.signuppassword.value;
  let role = signupform.role.value

  let data = {
    email,
    password,
    role
  };
  let res = await fetch(`https://top-hat-starfish.cyclic.app/signup`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  console.log(await res.json());
});

let loginform = document.getElementById("loginform");
loginform.addEventListener("submit", async (event) => {
  event.preventDefault();
  let email = loginform.loginemail.value;
  let password = loginform.loginpassword.value;

  let data = {
    email,
    password,
  };
  let res = await fetch(`https://top-hat-starfish.cyclic.app/login`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
  let datajson= await res.json()
 
  if(datajson?.token){
    console.log(datajson.token)
    document.cookie =  "token" + "=" + datajson.token;
    alert("You are redirecting to home")
    location.href = "/index.html"
  }
});

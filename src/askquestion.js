let logo = document.getElementById("logo");
logo.onclick = () => {
  location.href = "/index.html";
};

if (document.cookie.split("=")[1]) {
  document.getElementById("signup_button").style.display = "none";
  document.getElementById("logout_button").onclick = async () => {
    let res = await fetch(`https://top-hat-starfish.cyclic.app/logout`, {
      method: "GET",
      headers: {
        authentication: `Bearer ${document.cookie.split("=")[1]}`,
        "content-type": "application/json",
      },
    });
    let resjson = await res.json();
    if(resjson.msg=="User logged out successfully"){
      alert(resjson.msg)
      document.cookie =  "token" + "=" + "";
      location.reload()
    }
  };
} else {
  document.getElementById("profile_button").style.display = "none";
}


let form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let question = form.question.value;
  let tag = form.tag.value;

  let data = {
    question,
    tag,
  };
  let res = await fetch(`https://top-hat-starfish.cyclic.app/question/create`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      authentication: `Bearer ${document.cookie.split("=")[1]}`,
      "content-type": "application/json",
    },
  });

 let resdata = await res.json();
 if(resdata.msg=="question saved"){
    alert("your question posted")
    form.question.value =""
    form.tag.value=""
 }else if(resdata.msg=="please login again"){
  alert("please login or signup to post question")
 }
});

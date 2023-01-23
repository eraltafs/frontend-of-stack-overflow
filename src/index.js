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

const fun = async () => {
  let res = await fetch(`https://top-hat-starfish.cyclic.app/`, {
    // body: JSON.stringify(data),
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  let datajson = await res.json();
  return datajson;
};
let questionsdiv = document.getElementById("questionsdiv");
let body = document.querySelector("body");
body.onload = async () => {
  let data = await fun();
  console.log(data);
  data.forEach((el) => {
    let questionitem = document.createElement("div");
    questionitem.setAttribute("class", "questionitem");
    let p = document.createElement("p");
    p.textContent = "Q. " + el.question;
    p.onclick = () => {
      localStorage.setItem("element", JSON.stringify(el));
      location.href = "/nextpage.html";
    };

    tags = el.tag.split(",");

    tagsdiv = document.createElement("div");
    tagsdiv.setAttribute("class", "tagsbuttons");
    tags.forEach((tag) => {
      let button = document.createElement("button");
      button.innerText = tag.trim();

      tagsdiv.append(button);
    });
    questionitem.append(p, tagsdiv);
    questionsdiv.append(questionitem);
  });
};

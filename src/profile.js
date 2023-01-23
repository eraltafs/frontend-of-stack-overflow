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
let body = document.querySelector("body")
body.onload = async()=>{
  let res = await fetch("https://top-hat-starfish.cyclic.app/profile",{
    method:"GET",
    headers:{
      authentication: `Bearer ${document.cookie.split("=")[1]}`,
      "content-type": "application/json",
    }
  })
  data = await res.json()
  data.forEach((el) => {
    let questionitem = document.createElement("div");
    questionitem.setAttribute("class", "questionitem");
    let p = document.createElement("p");
    p.textContent = "Q. " + el.question;


    let editbutton =  document.createElement("button")
    editbutton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Edit`
    let inputupdate = document.createElement("input")
    inputupdate.placeholder= "Type Question here"
    inputupdate.style.display ="none"

    let tagupdate = document.createElement("input")
    tagupdate.placeholder ="Type tag here"
    tagupdate.style.display ="none"

    let submitbutton = document.createElement("button")
    submitbutton.innerText = "Submit"
    submitbutton.style.display ="none"

    editbutton.onclick = ()=>{
        inputupdate.style.display ="block"
        submitbutton.style.display ="block"
        tagupdate.style.display ="block"
        submitbutton.onclick = async()=>{
            question = inputupdate.value
            tag = tagupdate.value

            datasend = {
                question
            }
            if(question!==""&&tag!==""){
              datasend = {
                question,
                tag
            }
            }else if(question!==""){
              datasend = {
                question
            }
            }else{
              datasend = {
                tag
            }
            }
            let res = await fetch(`https://top-hat-starfish.cyclic.app/question/update/${el._id}`,{
                body:JSON.stringify(datasend),
                method: "PATCH",
                headers: {
                  authentication: `Bearer ${document.cookie.split("=")[1]}`,
                  "content-type": "application/json",
                },
            })
            let resjson = await res.json()
            if(resjson.msg=="question updated"){
                alert("question updated")
                window.location.reload()
            }

        }
    }
    
    let deletebutton = document.createElement("button")
    deletebutton.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`
    deletebutton.onclick = async()=>{
       
        let res = await fetch(`https://top-hat-starfish.cyclic.app/question/delete/${el._id}`,{
            method: "DELETE",
            headers: {
              authentication: `Bearer ${document.cookie.split("=")[1]}`,
              "content-type": "application/json",
            },
        })
        let resjson = await res.json()
        console.log(resjson)
        if(resjson.msg=="question deleted"){
            alert("question deleted")
            window.location.reload()
        }

    }



    tagsdiv = document.createElement("div");
    tagsdiv.setAttribute("class", "tagsbuttons");

    tags = el.tag.split(",");

    
    tags.forEach((tag) => {
      let button = document.createElement("button");
      button.innerText = tag.trim();

      tagsdiv.append(button);
    });
    questionitem.append(p, tagsdiv,editbutton,inputupdate,tagupdate,submitbutton,deletebutton);
    questionsdiv.append(questionitem);
  });
}

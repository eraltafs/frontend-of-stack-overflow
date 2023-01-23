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

let data = JSON.parse(localStorage.getItem("element"))||[]
let heading = document.querySelector("h1")
let answerdiv = document.getElementById("answerdiv")
let form = document.querySelector("form")
form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let answer = form.answer.value
    let senddata = {
        answer,
        question_id:data._id
    }
    if(!answer==""){

        let res = await fetch(`https://top-hat-starfish.cyclic.app/answer/create`, {
          method: "POST",
          body:JSON.stringify(senddata),
          headers: {
            authentication: `Bearer ${document.cookie.split("=")[1]}`,
            "content-type": "application/json",
          },
        });
        let datajson = await res.json();
        console.log(datajson)
        if(datajson.msg == "answer saved"){
            
            form.answer.value = ""
            alert("Your answer is posted")
            window.location.reload()
        }else if(datajson.msg=="login again"){
            document.getElementById("status").textContent = "Your answer not posted because you are not logged in"
            alert("Your answer not posted because you are not logged in")
        }
    }else{
        document.getElementById("status").textContent = "Your answer not posted please type something"
    }

})

const fun = async () => {
    let res = await fetch(`https://top-hat-starfish.cyclic.app/ans?question_id=${data._id}`, {
      // body: JSON.stringify(data),
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    let datajson = await res.json();
    if(datajson.length){
    
        append(datajson)
    }else{
        answerdiv.append("No answers till now")
    }
    
};
if(data?.question){
    heading.textContent = data?.question
    fun()
}

function append(datajson){
    console.log(datajson)
    datajson.forEach(el => {
        let answeritem = document.createElement("div")
        answeritem.setAttribute("class", "answeritem")
        let p = document.createElement("p")
        p.textContent ="Ans:-"+el.answer

        let editbutton =  document.createElement("button")
        editbutton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Edit`
        let inputupdate = document.createElement("input")
        inputupdate.placeholder= "Type Something"
        inputupdate.style.display ="none"

        let submitbutton = document.createElement("button")
        submitbutton.innerText = "Submit"
        submitbutton.style.display ="none"

        editbutton.onclick = ()=>{
            inputupdate.style.display ="block"
            submitbutton.style.display ="block"
            submitbutton.onclick = async()=>{
                answer = inputupdate.value
                datasend = {
                    answer
                }
                let res = await fetch(`https://top-hat-starfish.cyclic.app/answer/update/${el._id}`,{
                    body:JSON.stringify(datasend),
                    method: "PATCH",
                    headers: {
                      authentication: `Bearer ${document.cookie.split("=")[1]}`,
                      "content-type": "application/json",
                    },
                })
                let resjson = await res.json()
                if(resjson.msg=="answer updated"){
                    alert("answer updated")
                    window.location.reload()
                }else{
                    alert("you can't update another person's answer")
                }
    
            }
        }
        
        let deletebutton = document.createElement("button")
        deletebutton.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`
        deletebutton.onclick = async()=>{
           
            let res = await fetch(`https://top-hat-starfish.cyclic.app/answer/delete/${el._id}`,{
                method: "DELETE",
                headers: {
                  authentication: `Bearer ${document.cookie.split("=")[1]}`,
                  "content-type": "application/json",
                },
            })
            let resjson = await res.json()
            console.log(resjson)
            if(resjson.msg=="answer deleted"){
                alert("answer deleted")
                window.location.reload()
            }else{
                alert("you can't delete another person's answer")
            }

        }
        answeritem.append(p, editbutton,inputupdate,submitbutton, deletebutton)

        answerdiv.append(answeritem)
    });

}
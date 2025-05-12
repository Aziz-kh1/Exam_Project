//  FOR PROJECT
const users = JSON.parse(localStorage.getItem('users')) || [];
const username = document.cookie.split("; ").find(c => c.startsWith("profName="))?.split("=")[1];
const user = users.find(e => e.name +" "+ e.prenom === username, username)
console.log(user)
document.getElementById('accueillir').innerHTML = `${user.type} : ${user.prenom} ${user.name}`;
document.getElementById('welc').innerHTML = `Bonjour Monsieur ${user.prenom} ${user.name}, que voulez-vous faire ?`
const examkey=`examens_${username}`;
let Etudients=[];
const userExamens = JSON.parse(localStorage.getItem(examkey)) || [];
users.forEach(function(usr){
    if(usr.type==='Etudient'){
        let exist=0;
        let exam=[]
        usr.examens.forEach(function(e){
            if(e['prof_name']===username){
                exam.push(e)
                exist++;
            }   
        })
        if(exist!=0){
            Etudients.push({usr,exam})
        }
        
    }
})
// console.log(users)
console.log(Etudients)
document.getElementById("Creer").addEventListener('click',function(e){
    document.getElementById('choix_prof').style.display='none'
    document.getElementById('form-question').style.display='block'
});


document.getElementById("Resulta").addEventListener('click',function(e){
    document.getElementById('choix_prof').style.display='none';
    const container=document.getElementById('from_Resulta');
    container.style.display='block';
    // console.log(userExamens)
    const leng_examen=userExamens.length;
    const leng_etd=Etudients.length;
    console.log(leng_examen)
    if(leng_examen===1){
        container.innerHTML=`<h1 class='vide'><span>📭</span>Vous n'avez ajouté aucun examen !.</h1>`
        return;
    }
    for(let i=1;i<leng_examen;i++){
        const model=userExamens[i];
        const tab=document.createElement('table');
        tab.innerHTML=`<caption>${model["examen"].name}</caption>`
        tab.border=1;
        let head = `
            <thead>
                 <tr>
                <th> Nam </th>
                <th> Prenom </th>
                <th> Etablissement </th>
                <th> Filiere </th>
                <th> Email </th>
                <th> Note </th>
                </tr>
            </thead>`;
        tab.insertAdjacentHTML('beforeend', head);
        Etudients.forEach(function(etd){
            etd.exam.forEach(function(ex){
                if (ex.exam_nam === model["examen"].name) {
                    console.log(ex)
                    head = `
            <tr>
                <td> ${etd.usr.name} </td>
                <td> ${etd.usr.prenom} </td>
                <td> ${etd.usr.Etab} </td>
                <td> ${etd.usr.Filiere} </td>
                <td> ${etd.usr.Email} </td>
                <td> ${ex.note} </td>
            </tr>`
                    tab.insertAdjacentHTML('beforeend', head);
                }
            })
        })
        container.insertBefore(tab, container.querySelector(`#fin`));  
    } 
})

    
let nmQst = 2;
function AjoutOption(index) {
    let nmOpt = document.querySelectorAll(`.choix${index}`).length + 1;
    const container = document.getElementById(`Repons_choix${index}`);
    const newoption = document.createElement(`div`);
    newoption.className = `choix${index} choix`;
    newoption.innerHTML = `
                    <input type="text" name="Repons${nmOpt}" placeholder="Option ${nmOpt}"> 
                    <i id="choix${nmOpt}" onclick="removeOption(${nmOpt})" class="fa-solid fa-trash"></i>`;
    container.insertBefore(newoption, container.querySelector(`.Repons${index}`));

    //Ajoute un Option :

    const posRep = document.getElementById(`Repons_corect${index}`);
    const rep = document.createElement("option");
    let txt = document.createTextNode(`Option ${nmOpt}`);
    rep.setAttribute("name", `Repons${nmOpt}`);
    rep.setAttribute("id", `Repons${nmOpt}`);
    rep.setAttribute("value", `Repons${nmOpt}`);
    rep.append(txt);
    posRep.append(rep);
    nmOpt++;
}
function removeOption(elm) {
    const but = document.getElementById(`choix${elm}`)
    but.parentElement.remove()
    const rmrep = document.getElementById(`Repons${elm}`)
    rmrep.remove();
}
function ajouterQuestion() {
    let container = document.getElementById("container");
    const copy = document.createElement("div")
    copy.innerHTML = `<hr><div class="question" id="question${nmQst}">
            <input type="text" name="Question${nmQst}" id="Question${nmQst}" placeholder="Question${nmQst}">
        </div>
        <div id="Repons_choix${nmQst}" class="Repons_choix">
            <h3>Repons:</h3>
            <div class="choix${nmQst} choix">
                <input type="text" name="Repons1" placeholder="Opion 1" required>
            </div>
            <div class="choix${nmQst} choix">
                <input type="text" name="Repons2" placeholder="Opion 2" required>
                <i id="choix2" onclick="removeOption(${nmQst})" class="fa-solid fa-trash"></i>
            </div
        </div>
            
    </div>
        <div class="Repons${nmQst} Repons">
            <label for="Repons_corect">Reponse Correcte</label>
            <select id="Repons_corect${nmQst}" name="Repons_corect">
                <option id="Repons1" value="Repons1">Option 1</option>
                <option id="Repons2" value="Repons2">Option 2</option>
            </select><br>
                <label for="note">Point de Question</label>
                <input type="number" name="note" id="note${nmQst}" max="20" min="1" value="1">
                <input class="ajouterOption${nmQst}" onclick="AjoutOption(${nmQst})" value="Ajouter Option">
        </div>`
    container.insertBefore(copy, container.querySelector(`.ajouterQuestion`));
    nmQst++;
}

document.getElementById('Conferm').addEventListener('click',
    function (e) {
        e.preventDefault();
        const nmbQst = document.querySelectorAll('.question').length; 
        let examen={
            name:document.getElementById('nom_examen').value,
            questions:[]
        };
        for (let i = 1; i <= nmbQst; i++) {
            const enonce = document.getElementById(`Question${i}`).value;
            const points = parseInt(document.getElementById(`note${i}`).value);
            let nmbRp=document.querySelectorAll(`choix${i}`)
            const repChoix = [];
            const repCorect=document.getElementById(`Repons_corect${i}`).value;
            document.querySelectorAll(`.choix${i} input`).forEach(inp => {
                const text = inp.value;
                const rep = inp.name===repCorect;
                repChoix.push({text,rep});
            });
            examen.questions.push({enonce,points,repChoix});
        }
        console.log(examen)
        
        const check_exist = userExamens.some(e => e["examen"].name === examen.name);
        if(check_exist){
            console.log("existe")
            for(let i of Object.values(userExamens)){
                if(i['examen'].name===examen.name){
                    i['examen'].questions=i['examen'].questions.concat(examen.questions);
                    localStorage.setItem(examkey, JSON.stringify(userExamens));
                    alert('Question ajouté avec succès !');
                    return;
                }
            }
        }else {
            userExamens.push({proprietaire:username,examen})
            console.log("n'exest pas");
            localStorage.setItem(examkey, JSON.stringify(userExamens));
            alert('Examen ajouté avec succès !');
        }
        console.log(userExamens)
        
    });

// localStorage.clear()
let userType='unknow';
function user_type(type1,type2){
    document.getElementById(`${type1}`).checked = false;
    document.getElementById(`${type1}`).required = false;
    document.getElementById(`${type2}`).required = true;
    userType=document.getElementById(`${type2}`).value;
}
function display_sing(elm1,elm2,req1,req2){
    document.querySelectorAll(`.${elm1}`).forEach(el => el.style.display = 'none');
    document.querySelectorAll(`.${elm2}`).forEach(el => el.style.display = 'flex');
    document.querySelectorAll(`.${req1}`).forEach((e)=>e.required = false)
    document.querySelectorAll(`.${req2}`).forEach((e)=>e.required = true)

    
}
document.getElementById('sign-up').addEventListener('submit',function (e) {
    e.preventDefault();
    console.log("from sing-up")
    const user = {
        name: document.getElementById('nom').value,
        prenom: document.getElementById('Prenom').value,
        date: document.getElementById('date').value,
        sex: document.getElementById('sex').value,
        Etab: document.getElementById('Etablissement').value,
        Filiere: document.getElementById('Filiere').value,
        Email: document.getElementById('newEmail').value,
        password: document.getElementById('newpassword').value,
        type:userType,
    };
    if(user.type==="Etudient"){
        user.examens=[];
    }else (user.type==="Professeur")
    {
        // user.etudient=[]
        let userExamens=[];
        let proprietaire= `${user.name+" "+user.prenom}`;
        let examen={
                name:'null',
                questions: []
        }
        userExamens.push({proprietaire,examen});
        localStorage.setItem(`examens_${proprietaire}`, JSON.stringify(userExamens));
        console.log(userExamens)
    }
    console.log(user)
    const userKey ='users';
    const users = JSON.parse(localStorage.getItem(userKey)) || [];
    console.log(users)
    const check_exist=users.some(e=>e.name+e.prenom===user.name+user.prenom || e.Email===user.Email,user);
    if(check_exist){
        alert('user or Email est deja trouvé !');
    }
    else {
        users.push(user);
        localStorage.setItem(userKey, JSON.stringify(users));
        alert('User ajouté avec succès !');
        document.getElementById('but_Sing-in').click();
        console.log(document.getElementById('but_Sing-up'))    
    }
});
function sing_in() {
        console.log("from sing-in")
        const user = {
            Email: document.getElementById('Email').value,
            password: document.getElementById('password').value,
        };
        const userKey ='users';
        const users = JSON.parse(localStorage.getItem(userKey)) || [];
        const check_exist = users.find((e) => e.Email === user.Email && e.password === user.password, user);
        if (check_exist!=undefined) {
            if(check_exist.type==="Professeur"){
                document.cookie = `profName=${check_exist.name+" "+check_exist.prenom}; path=/`;
                window.location.href = `../prof_qsm/QSM.html`;
            }
            else{
                document.cookie = `etdName=${check_exist.name+" "+check_exist.prenom}; path=/`;
                window.location.href = `../etd_qsm/QSM.html`;
            }
            
        }
        else {
            alert('Email ou le mot de passe est incorrect.!');
        }
}




// console.log(user)
//     const userKey = user.type+ user.name+user.prenom;
//     console.log(userKey)
//     const users = JSON.parse(localStorage.getItem(userKey)) || []; 
//     console.log(users.longh)
//     if (users.longh===0) { 
//         users.push(user);
//         localStorage.setItem(userKey, JSON.stringify(users));
//         alert('User ajouté avec succès !');
        
//     }
//     else {
//        alert('user est deja trouvé !');
//     } 
//     console.log(users);
//     // users.push(user);
   
//     // localStorage.setItem(userKey, JSON.stringify(users));
//     // alert('User ajouté avec succès !');
//     // this.reset();
    
// const Prof_type=document.getElementById("Prof");
// const Etd_type=document.getElementById("Etd");
// function check_dsc(elm){
//     elm.checked=false;
//     console.log("yy")
// }
// Prof_type.checked===true?check_dsc(Etd_type):check_dsc(Prof_type);
// function display_sing_up(){
//     //document.querySelectorAll('.sign-up').addEventListener("click", () => {container.classList.add("active")});
//     document.getElementById('sign-in').addEventListener("click", () => {container.classList.add("disabled")});
// }

// function display_sing_in(){
//     document.getElementById('sign-in').addEventListener("click", () => {container.classList.add("disabled")});
    
//     // document.querySelectorAll('.sign-in').forEach(el => el.style.display = 'none');
//     // document.querySelectorAll('.sign-up').forEach(el => el.style.display = 'flex');
//     // document.getElementById("but_sign-in").style.backgroundColor="transparent"
// }
    
    // const userkey = 'user_' + prenom+name;
    // const users = JSON.parse(localStorage.getItem(userkey)) || [];
    // const user = users.find(e => e.nom === nomExamen);
    // if (!user) {
    //     alert('Examen non trouvé !');
    //     return;
    // }
    // const user = { name, prenom, date, sex,Etab,Filiere,Email,password };
    //     login.users.push(user);
    //     localStorage.setItem(examsKey, JSON.stringify(exams));
    //     alert('Question ajoutée avec succès !');
    //     this.reset();
    //     document.getElementById('propositions').innerHTML = '';


    //     const question = { enonce, duree, points, propositions };
    //     exam.questions.push(question);
    //     localStorage.setItem(examsKey, JSON.stringify(exams));
    //     alert('Question ajoutée avec succès !');
    //     this.reset();
    //     document.getElementById('propositions').innerHTML = '';


    //     const examsKey = 'examens_' + proprietaire;
    //     const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    //     const exam = exams.find(e => e.nom === nomExamen);
    //     if (!exam) {
    //         alert('Examen non trouvé !');
    //         return;
    //     }
    //     // TODO : Ajouter la question à l'examen et mettre à jour le localStorage
    //     const question = { enonce, duree, points, propositions };
    //     exam.questions.push(question);
    //     localStorage.setItem(examsKey, JSON.stringify(exams));
    //     alert('Question ajoutée avec succès !');
    //     this.reset();
    //     document.getElementById('propositions').innerHTML = '';
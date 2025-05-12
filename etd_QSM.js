const users = JSON.parse(localStorage.getItem('users')) || [];
const username = document.cookie.split("; ").find(c => c.startsWith("etdName="))?.split("=")[1];
const userEtd = users.find(e => e.name + " " + e.prenom === username, username)
document.getElementById('accueillir').innerHTML = ` ${userEtd.name} ${userEtd.prenom}`;
let prof_name;
let exam_nam;
let exam;
let Question;
let cnt = 0;
let nmbQst;
let QstNot = new Set();
let rep = new Set()
document.getElementById('btn').addEventListener('click',
    function (e) {
        e.preventDefault();

        prof_name = document.getElementById('prof_name').value;
        exam_nam = document.getElementById("examName").value;

        const examens = JSON.parse(localStorage.getItem(`examens_${prof_name}`)) || [];
        exam = examens.find((e) => e["examen"].name === exam_nam);
        if (!exam) {
            alert('Examen non trouvé !')
            return;
        }
        document.getElementById(`exam_inf`).style.display = 'none';
        document.getElementById(`exam_cont`).style.display = 'block';
        document.getElementById('prof_model').innerHTML = ` ${prof_name}/${exam_nam}`;

        console.log(exam)
        nmbQst = exam["examen"].questions.length;
        Question = exam["examen"].questions;
        let Choix = Question[cnt].repChoix;
        const Repons = Question[cnt].repChoix;
        const Quest = Question[cnt].enonce;
        let point = Question[cnt].points;
        QstNot.add({ cnt, point });

        const container = document.getElementById('Exam')
        const enonce = document.createElement('h3');
        enonce.innerHTML = `<strong>Question ${cnt + 1}</strong> : ${Quest}    <span>(${point}point)</span>`;
        container.appendChild(enonce);
        for (let rep of Repons) {
            const texteHTML = `<div class="choix"><input type="radio" name="question${cnt + 1}" id="question${cnt + 1}" value="${rep.rep}" required><label for="q1">${rep.text}</label></div>`;
            container.insertAdjacentHTML('beforeend', texteHTML);
        }
        cnt++;
    });

let note = 0;
document.getElementById('Next').addEventListener('click',
    function (e) {
        e.preventDefault();
        let Choix = document.querySelector("input:checked").value;
        cnt--;
        rep.add({ cnt, Choix })
        cnt++;
        if (cnt < nmbQst) {

            const Repons = Question[cnt].repChoix;
            const Quest = Question[cnt].enonce;
            let point = Question[cnt].points;
            QstNot.add({ cnt, point });
            const container = document.getElementById('Exam')
            container.innerHTML = '';
            const enonce = document.createElement('h3');
            enonce.innerHTML = `<strong>Question ${cnt + 1}</strong> : ${Quest}    <span>(${point}point)</span>`;
            container.appendChild(enonce);
            for (let rep of Repons) {
                const texteHTML = `<div class="choix"><input type="radio" name="question${cnt + 1}" id="question${cnt + 1}" value="${rep.rep}" required><label for="q1">${rep.text}</label></div>`;
                container.insertAdjacentHTML('beforeend', texteHTML);
            }
            cnt++;
            if (cnt === nmbQst) {
                document.getElementById('Next').innerHTML = 'Terminer';
            }
        }
        else {
            const Notes = [...QstNot]
            const Reps = [...rep]
            Reps.forEach((elm, ind) => elm.Choix === 'true' ? note += Notes[ind].point : note += 0)
            for (let e of Object.values(users)) {
                console.log("ajoite")
                if (e.name + " " + e.prenom === username) {

                    e.examens.push({ prof_name, exam_nam, note });

                }
            }
            localStorage.setItem('users', JSON.stringify(users));
            console.log(users)
            alert('Question ajouté avec succès !');
            return;
        }
    });
document.getElementById('Ret').addEventListener('click',
    function (e) {
        e.preventDefault();
        cnt -= 2;
        document.getElementById('Next').click();
    });
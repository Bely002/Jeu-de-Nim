const changeBarCanvas = document.getElementById("changeBarCanvas");
const ktext = document.getElementById("k-batonnets");
const first = document.getElementById("first");
const moyenne = document.getElementById("Moyenne");
const parties =document.getElementById("parties");
const changements=document.getElementById("changements");
const partiesM =document.getElementById("partiesM");
const changementsM=document.getElementById("changementsM");
const resteEl = document.getElementById("reste");
const resultReste = document.getElementById("resultReste");
const ameliorationEl = document.getElementById("amelioration");
const ameliorationMEl = document.getElementById("ameliorationM");

//5-10min

let etape
let change
let compteurchange
let partiesFinir
let changementsFinir
let pUp
let pUpM
let l


const equalsCheck = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

const equalsCheckAlmost = (a, b) => {
  la=[...a]
  lb=[...b]
  delete la[4]
  delete lb[4]
  return JSON.stringify(la) === JSON.stringify(lb);
}

const equalsCheckAlmostfirst = (a, b) => {
  la=[...a]
  lb=[...b]
  delete la[2]
  delete lb[2]
  return JSON.stringify(la) === JSON.stringify(lb);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min+1)) + min;
}

function generer(k){
  liste = []
  for (let index = 0; index < k; index++) {
    liste.push([1,2,3]);
  };
  liste[k-2]=[1,2];
  liste[k-1]=[1];
  return liste;
};

function jeu(liste,f){
  N = liste.length;
  let IaN
  let IaChoix
  if(f){
    while(N>0){
      IaChoix=getRandomInt(0,liste[liste.length-N].length-1);
      IaN = N; //IA
      N=N-liste[liste.length-N][IaChoix];
      if(N==0){
        break 
      };
      j= [1,2,3][getRandomInt(0,2)];
      N=N-j; //Joueur
      if(N<=0 || (liste[liste.length-N]==undefined || liste[liste.length-N]==[] || liste[liste.length-N].length===0)){
        liste[liste.length-IaN].splice(IaChoix,1);
        etape+=1
        break;
      };
    }
  } else{
    while(N>0){
      j= [1,2,3][getRandomInt(0,2)];
      N=N-j; //Joueur
      if((liste[liste.length-N]==undefined || liste[liste.length-N]==[] || liste[liste.length-N].length===0) && N+j==liste.length){
        break;
      };
      if(N<=0 || (liste[liste.length-N]==undefined || liste[liste.length-N]==[] || liste[liste.length-N].length===0)){
        liste[liste.length-IaN].splice(IaChoix,1);
        etape+=1
        break;
      };
      IaChoix=getRandomInt(0,liste[liste.length-N].length-1);
      IaN = N; //IA
      N=N-liste[liste.length-N][IaChoix];
    };
  }
};

function meilleur(k,f){
  liste = []
  if(f){
    nb=k+1
  }else{
    nb=k
  }
  for (let index = 0; index < k; index++) {
    liste.push([1,2,3]);
  };
  for(let i=1;i<nb;i++){
    if(i%4==0){
      liste[liste.length-i]=[];
    } else {
      liste[liste.length-i]=[i%4];
    };
  };
  if(f){
    liste[1]=[1,2,3]
  }
  return liste
};


function Test(N, f){
  n=N
  l=generer(n)
  etape=0
  change=[0]
  compteurchange=[0]
  listemeilleur=meilleur(n,f)
  if(n%4==1 && f==false){
    while(equalsCheckAlmost(l,listemeilleur)==false){
      jeu(l,f)
      consoleAfficher(l)
      compteurchange.push(compteurchange[compteurchange.length-1]+1)
      change.push(etape)
    };
  } else if((n%4!=1 && f==false)||(n%4!=0 && n%4!=3 && f==true)) {
    while(equalsCheck(l,listemeilleur)==false){
      jeu(l,f)
      consoleAfficher(l)
      compteurchange.push(compteurchange[compteurchange.length-1]+1)
      change.push(etape)
    };
  } else if(n%4==3) {
    while(equalsCheckAlmostfirst(l,listemeilleur)==false){
      jeu(l,f)
      consoleAfficher(l)
      compteurchange.push(compteurchange[compteurchange.length-1]+1)
      change.push(etape)
    };
  } else {
    while(l[0].length!=0){
      jeu(l,f)
      consoleAfficher(l)
      compteurchange.push(compteurchange[compteurchange.length-1]+1)
      change.push(etape)
    };
  }
};
  

function consoleAfficher(liste){
  const cons=document.getElementById("console");
  para = document.createElement("p");
  txt=""
  for(let i=0;i<liste.length;i++){
    txt=txt+"["+String(liste[i])+"] "
  }
  txt+="[]"
  node = document.createTextNode(txt);
  para.appendChild(node);
  cons.appendChild(para);

};  

function rep(N,f,m){
  partiesFinir=0
  changementsFinir=0
  pUpM=0
  for(i=0;i<m;i++){
    Test(N,f)
    pUp=100/compteurchange[compteurchange.length-1]
    pUpM+=pUp
    partiesFinir+=compteurchange[compteurchange.length-1]
    changementsFinir+=etape
  }
  partiesFinir=partiesFinir/m
  changementsFinir=changementsFinir/m
  pUpM=pUpM/m
}


const changeBarChart = new Chart(changeBarCanvas, {
  data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [{
          type: 'line',
          label: 'Changements',
          data: [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6],
          borderWidth: 1,
          pointRadius: 0,
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true,
              max: 50
          }
      },
      responsive:true, 
      plugins: {
        title: {
            display: true,
            text: 'Nombre de changements en fonction du nombre de jeux'
        }
      } 
  }
});

function reload(ctx,labels,data){
  ctx.data.labels=labels
  ctx.data.datasets[0].data=data
  ctx.options.scales.y.max=data[data.length-1]
  ctx.update()
}



function charger(){
  rep(ktext.value-1,first.checked,moyenne.value)
  l.push([])
  reload(changeBarChart,compteurchange,change);
  parties.innerHTML=compteurchange[compteurchange.length-1];
  changements.innerHTML=etape;
  partiesM.innerHTML=partiesFinir
  changementsM.innerHTML=changementsFinir
  ameliorationEl.innerHTML=pUp
  ameliorationMEl.innerHTML=pUpM
}

function chargerIASimul(){
  if(resteEl.value>l.length || resteEl.value<1){
    resultReste.innerHTML="Je n'ai pas calculé jusque ici, veuillez entrer un autre nombre."
  }else if(l[l.length-resteEl.value].length===0){
    resultReste.innerHTML="Vous n'avez pas de stratégie gagnante."
  }else if(l[l.length-resteEl.value].length>1){
    resultReste.innerHTML="Erreur"
  }else {
    resultReste.innerHTML="Je vous conseille de retirer "+l[l.length-resteEl.value][0]+" bâtonnets."
  }
}

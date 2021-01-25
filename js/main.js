window.addEventListener('load', () => {
  console.log('start');
  hidenDiv = document.querySelector('.escondido');
  hidenDiv.style = "display: none;";
  preventSubmit();
  activateInput();
});

const preventSubmit = (()=>{
  const handleFormSubmit = ((event)=>{
    event.preventDefault();
  });
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
});

const clearInput = ()=>
{
  const inputCep = document.querySelector('#inputCep');
  inputCep.innerHTML = "";
};

const activateInput =  (() => {
  const globalInput = document.querySelector('#inputCep');
  const handleTyping =  ((event) =>{
    let hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      consultaCep(event.target.value);
    }
  });
  globalInput.addEventListener('keyup', handleTyping);
});

const renderTable = ((dados) => {
  console.log(dados);
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let thr = document.createElement('tr');
  let th01 = document.createElement('th');
  let th02 = document.createElement('th');
  let keys = Object.keys(dados);
  
  table.className = "table table-striped table-bordered";
  th01.innerHTML = keys[0];
  th01.scope="col";
  th02.innerHTML = dados[keys[0]];
  th02.scope="col";
  
  thr.appendChild(th01);
  thr.appendChild(th02);
  thead.appendChild(thr);
  table.appendChild(thead);
  
  for (key in keys){
    if (key == 0) continue;
    let tr = document.createElement('tr');
    let tdTipo = document.createElement('td');
    let tdValor = document.createElement('td');
    tdTipo.innerHTML  = keys[key];
    tdValor.innerHTML = dados[keys[key]];
    tr.appendChild(tdTipo);
    tr.appendChild(tdValor);
    tbody.appendChild(tr);
  }
  
  table.appendChild(tbody);
  return table;
});

const consultaCep = ((cep) =>{
  const divCeps = document.querySelector('#retornoCep');
  const request = new Request("https://viacep.com.br/ws/"+cep+"/json", {"method": "GET"});
  this.fetch(request).then((res) => {
    res.json().then((data) => {
      divCeps.innerHTML="";
      divCeps.appendChild(renderTable(data));
      
    });
  }).catch((error) => {
    console.log("ixi deu erro"+error);
    divCeps.innerHTML="";
    let json = {"cep":"invalido"};
    divCeps.appendChild(renderTable(json));
  });
  
  // $.ajax({
  //   url: "https://viacep.com.br/ws/"+cep+"/json",
  //   type: "GET",
  //   dataType: "json"
  // })
  // .done((response)=>{
  //     $('#retornoCep').html("");
  //     render(response);
  // })
  // .fail(() => {
  //     $('#retornoCep').html("");
  //     let json = {"cep":"invalido"};
  //     render(json);
  //   }
  // );

});
var mes = []

var mesInput = input()

var el = listMessages(mes, handleClick)

function listMessages(list, onclick){
  return yo`<div>encrypted Messasges
    <ul>
    ${list.map(function(item){
      return yo`<li>${item}</li>`
    })}
    </ul>
    ${mesInput}<button onclick=${onclick}>Add</button>
  </div>`
}

function input(){
  return yo`<input type="text">`
}

function handleClick() {
  mes.push(mesInput.value)
  mesInput.value = ''

  var newEl = listMessages(mes, handleClick)
  yo.update(el, newEl)
}

document.body.appendChild(el)

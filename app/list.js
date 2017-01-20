var level = require('level-browserify')
var yo = require('yo-yo')
var db = level('./db')
window.CryptoJS = require('browserify-cryptojs');
require('browserify-cryptojs/components/enc-base64');
require('browserify-cryptojs/components/md5');
require('browserify-cryptojs/components/evpkdf');
require('browserify-cryptojs/components/cipher-core');
require('browserify-cryptojs/components/aes');


var mes = []
var mesInput = input()
var el = listMessages(mes, handleClick)


var masterpass = '' + Math.floor(Math.random() * 9000) + 1000


db.get('name', function (err, value) {
  if (err) return console.log('Ooops!', err) // likely the key was not found

  // ta da!
  console.log('asdname=' + value)
})

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
  if (mesInput.value != '') {
    mes.push(CryptoJS.AES.encrypt(mesInput.value, masterpass).toString())
    mesInput.value = ''

    var newEl = listMessages(mes, handleClick)
    yo.update(el, newEl)
  }
}

document.body.appendChild(el)

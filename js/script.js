
function getAllItems(){
  
  let request = new XMLHttpRequest()
  let url_get_all_items = "http://localhost:8000/product"

  request.open("GET", url_get_all_items, true)
  request.setRequestHeader("Access-Control-Allow-Origin", "*")

  request.onreadystatechange = function(){
  if(request.readyState == 4){
      let itemsDiv = document.getElementById("items")
      json = JSON.parse(request.responseText)

      for(let i = 0; i < json.length; i++){

        let div = document.createElement("div")
        div.setAttribute("class", "item")
        let string = "<div class='img-container'><h4>" + json[i]['title'] + "</h3></div>"

        if(typeof(json[i]['description']) != "undefined"){
          string += "<p>Descrição: "+json[i]['description']+"</p>"
        }

        if(typeof(json[i]['address']) != "undefined"){
          string += "<p>Link: "+json[i]['address']+"</p>"
        }

        if(json[i]['bought'] == "True"){
          string += "<div>Comprado: <input value='True' onclick=put('"+json[i]["product_id"]+"') id='check"+json[i]["product_id"]+"' type='checkbox' checked></div>"
        } else{
          string += "<div>Comprado: <input value='False' onclick=put('"+json[i]["product_id"]+"') id='check"+json[i]["product_id"]+"' type='checkbox'></div>"
        }
       
        string += "<div class='img-container img-btn'><img class='img' src='http://localhost:8000/product/"+json[i]['product_id']+"/image'><div class='text'>" 
        + "<input id='img"+json[i]["product_id"]+"'name='image' type='file' onchange=imageUpload('"+json[i]["product_id"]+"')><br><br><button onclick=postImg('"
        + json[i]["product_id"]+"') >Enviar</button><button onclick=removeImage('"+ json[i]["product_id"]+"') >Excluir</button></div></div>"
        
        string += "<div class='img-container'><button onclick=remove('"+json[i]["product_id"]+"')>Excluir</button></div>"
        
        div.innerHTML = string
        itemsDiv.append(div)
      }
    }
  }
  request.send()
}

let pos = 0
function changeGrade(){
  let grid = ["1fr", "1fr 1fr", "1fr 1fr 1fr"]
  pos+=1
  document.getElementById("items").style.gridTemplateColumns = grid[pos%3]
}

function getRandom(){
  let request = new XMLHttpRequest()
  let url_get_random_item = "http://localhost:8000/product?random=True"
  request.open("GET", url_get_random_item, true)
  request.setRequestHeader("Access-Control-Allow-Origin", "*")
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      
      let itemsDiv = document.getElementById("randomItem")
      itemsDiv.innerHTML = ""
      json = JSON.parse(request.responseText)
      let div = document.createElement("div")
      div.setAttribute("class", "item")
      let string = "<div class='img-container'><h4>" + json['title'] + "</h3></div>"

      if(typeof(json['description']) != "undefined"){
        string += "<p>Descrição: "+json['description']+"</p>"
      }

      if(typeof(json['address']) != "undefined"){
        string += "<p>Link: "+json['address']+"</p>"
      }

      if(json['bought'] == "True"){
        string += "<div>Comprado: <input value='True' onclick=put('"+json["product_id"]+"') id='check"+json["product_id"]+"' type='checkbox' checked></div>"
      } else{
        string += "<div>Comprado: <input value='False' onclick=put('"+json["product_id"]+"') id='check"+json["product_id"]+"' type='checkbox'></div>"
      }
      
      string += "<div class='img-container img-btn'><img class='img' src='http://localhost:8000/product/"+json['product_id']+"/image'><div class='text'>" 
      + "<input id='img"+json["product_id"]+"'name='image' type='file' onchange=imageUpload('"+json["product_id"]+"')><br><br><button onclick=postImg('"
      + json["product_id"]+"') >Enviar</button><button onclick=removeImage('"+ json["product_id"]+"') >Excluir</button></div></div>"
      
      string += "<div class='img-container'><button onclick=remove('"+json["product_id"]+"')>Excluir</button></div>"
      
      div.innerHTML = string
      itemsDiv.append(div)
    }
  }
  request.send()
}

function remove(id){

  let request = new XMLHttpRequest()
  let url_delete = "http://localhost:8000/product/" + id

  request.open("DELETE", url_delete, true)
  request.setRequestHeader("Access-Control-Allow-Origin", "*")

  request.onreadystatechange = function(){
    if(request.readyState == 4){
      document.location.reload(true)
    }
  }
  request.send()
}

function removeImage(id){

  let request = new XMLHttpRequest()
  let url_delete_img = "http://localhost:8000/product/" + id + "/image"

  request.open("DELETE", url_delete_img, true)
  request.setRequestHeader("Access-Control-Allow-Origin", "*")

  request.onreadystatechange = function(){
    if(request.readyState == 4){
      document.location.reload(true)
    }
  }
  request.send()
}

function insert(){

  let title = document.getElementById("title")
  let description = document.getElementById("description")
  let address = document.getElementById("address")

  if(title.value == ""){
    alert("O campo 'Título' é obrigatório.")
    return
  }

  if(description.value!="" && address.value != ""){
    json = '{ "title" : "' + title.value + '", "description" : "' + description.value + '", "address" : "' + address.value + '"}'
  }
  else if(description.value=="" && address.value != ""){
    json = '{ "title" : "' + title.value + '", "address" : "' + address.value + '"}'
  }
  else if(description.value!="" && address.value == ""){
    json = '{ "title" : "' + title.value + '", "description" : "' + description.value + '"}'
  }
  else{
    json = '{ "title" : "' + title.value + '"}'
  }

  let request = new XMLHttpRequest()
  let url_insert = "http://localhost:8000/product"

  request.open("POST", url_insert, true)
  request.setRequestHeader("Content-type", "application/json")

  request.onreadystatechange = function(){
    if(request.readyState == 4){
      document.location.reload(true)
    }
  }
  request.send(json)
}

function put(id){
  let checkbox = document.getElementById("check"+id)
  let request = new XMLHttpRequest()
  let json

  if(checkbox.value == "True"){
    json = '{"bought":"False"}'
  }
  else if(checkbox.value == "False"){
    json = '{"bought":"True"}'
  }

  let url_put = "http://localhost:8000/product/" + id

  request.open("PUT", url_put, true)
  request.setRequestHeader("Content-type", "application/json")
  
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      document.location.reload(true)
    }
  }
  request.send(json)
}

let base64img = "";
function imageUpload(id){
  let img = document.getElementById('img'+id)
  let file = img.files[0]
  let reader = new FileReader();
  reader.onloadend = function() {
    base64img = reader.result.split('base64,')[1]
  }
  reader.readAsDataURL(file)
}

function postImg(id){
  if(base64img != ""){
    let bin = atob(base64img)
    let len = bin.length;
    let barr = new Uint8Array(len);
    i = 0;
    while (i < len) {
      barr[i] = bin.charCodeAt(i);
      i++;
    }
    let blob = new Blob([barr], {type: 'image/png'});

    let formData = new FormData()
    formData.append("image", blob);
    let request = new XMLHttpRequest();
    let url_post = "http://localhost:8000/product/"+id+"/image"
    request.open("POST", url_post)
    request.onreadystatechange = function(){
      if(request.readyState == 4){
        document.location.reload(true)
      }
    }
    request.send(formData);
  }
}

window.onload = function() {
  getAllItems();
};
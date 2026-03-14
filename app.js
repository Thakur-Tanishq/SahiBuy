import { auth, db } from "./firebase.js"

import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"


const ADMIN_EMAIL="thakurtanishq489@gmail.com"


// SIGNUP

window.signup=async()=>{

const email=document.getElementById("email").value
const password=document.getElementById("password").value

await createUserWithEmailAndPassword(auth,email,password)

alert("Account created")

}


// LOGIN

window.login=async()=>{

const email=document.getElementById("email").value
const password=document.getElementById("password").value

await signInWithEmailAndPassword(auth,email,password)

alert("Logged in")

location.href="index.html"

}


// ADD PRODUCT

window.addProduct=async()=>{

const title=document.getElementById("title").value
const price=document.getElementById("price").value
const desc=document.getElementById("desc").value

await addDoc(collection(db,"products"),{

title,
price,
desc

})

alert("Product posted")

loadProducts()

}


// LOAD PRODUCTS

async function loadProducts(){

const query=await getDocs(collection(db,"products"))

const box=document.getElementById("products")

if(!box) return

box.innerHTML=""

query.forEach(docu=>{

const p=docu.data()

box.innerHTML+=`

<div class="bg-white p-4 rounded shadow">

<h3 class="font-bold">${p.title}</h3>

<p>₹${p.price}</p>

<p>${p.desc}</p>

</div>

`

})

}

loadProducts()



// ADMIN LOGIN

window.adminLogin=()=>{

const email=document.getElementById("adminEmail").value

if(email===ADMIN_EMAIL){

document.getElementById("dashboard").classList.remove("hidden")

loadAdmin()

}

else{

alert("Not admin")

}

}



// ADMIN PRODUCT VIEW

async function loadAdmin(){

const query=await getDocs(collection(db,"products"))

const box=document.getElementById("adminProducts")

box.innerHTML=""

query.forEach(docu=>{

const p=docu.data()

box.innerHTML+=`

<div class="bg-white p-4 mb-2">

${p.title} - ₹${p.price}

<button onclick="deleteProduct('${docu.id}')"
class="bg-red-500 text-white px-2 ml-2">

Delete

</button>

</div>

`

})

}



// DELETE PRODUCT

window.deleteProduct=async(id)=>{

await deleteDoc(doc(db,"products",id))

loadAdmin()

}
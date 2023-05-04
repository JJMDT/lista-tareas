

const formulario = document.getElementById("formulario");
const listaTareas = document.getElementById("lista-tareas");
const input = document.getElementById("input")
const template = document.getElementById("template").content
const fragment = document.createDocumentFragment();
let tareas = {
    // 1683119353871:{
    //     id:1683119353871,
    //     texto: "tarea #1",
    //     estado: false
    // },
    // 1683119799478: {
    //     id: 1683119799478,
    //     texto: "tarea 2",
    //     estado : false
    // }
}
document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem("tareas")){
        tareas = JSON.parse(localStorage.getItem("tareas"))
    }
pintarTareas()
})
listaTareas.addEventListener("click",e =>{
   btnAccion(e)
  
})
//console.log(Date.now())

formulario.addEventListener("submit", e=>{
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target.querySelector("input").value)
    // console.log(input.value)

    setTarea(e)
})
const setTarea = e=>{
if (input.value.trim() === "") {
    console.log("esta vacio")
    alert ("no agrego tareas")

    return
}
const tarea ={ 
id:Date.now(),
texto:input.value,
estado:false
}

tareas[tarea.id]=tarea
// console.log(tareas)
formulario.reset()
input.focus()

pintarTareas()
}
const pintarTareas = () =>{
    localStorage.setItem("tareas",JSON.stringify(tareas))

    

    if (Object.values(tareas).length === 0) {
        listaTareas.innerHTML=`
        <div class="alert alert-dark text-center">
        no hay tareas pendientes 😎
    </div>
    `
 
    return
    }

    listaTareas.innerHTML=""
    Object.values(tareas).forEach( tarea =>{
        const clone = template.cloneNode(true)
        clone.querySelector("p").textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector(".alert").classList.replace("alert-warning","alert-primary");
            clone.querySelectorAll(".bi")[0].classList.replace("bi-check-circle-fill","bi-arrow-repeat")
            clone.querySelector("p").style.textDecoration="line-through"

        }

        clone.querySelectorAll(".bi")[0].dataset.id = tarea.id
        clone.querySelectorAll(".bi")[1].dataset.id = tarea.id
        fragment.appendChild(clone)


    })
    listaTareas.appendChild(fragment)
}
const btnAccion=e =>{
    if(e.target.classList.contains("bi-check-circle-fill")){
        tareas[e.target.dataset.id].estado=true
        pintarTareas()
      
    }
    if(e.target.classList.contains("bi-dash-circle-fill")){
        delete tareas[e.target.dataset.id]
        pintarTareas()
    
    }

    if(e.target.classList.contains("bi-arrow-repeat")){
        tareas[e.target.dataset.id].estado=false

        pintarTareas()
    }
    e.stopPropagation()
}
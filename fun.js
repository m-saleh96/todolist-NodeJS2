const fs = require('fs')
const filePath = process.env.FILE_PATH || "./db.json"

function checkFS(path) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path,JSON.stringify([]))
    }
}
checkFS(filePath)




function add(req ,res) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const body = req.body
    const lastID = ((todoList[(todoList.length)-1]).id)+1
    const todo = {
        id:lastID,
        title : body.title,
        body : body.body,
        checked: false
    }
    todoList.push(todo)
    fs.writeFileSync(filePath,JSON.stringify(todoList))
    res.send(todoList) 
}



function edit(req , res) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const id = req.params.id
    const body = req.body
    todoList.map((elem)=>{
        if (elem.id == id) {
            elem.title = body.title
            elem.body = body.body
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList))
    res.send(todoList)

}





function remove(req , res) {
    let todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const id = req.params.id

    todoList = todoList.filter((elem)=>{
        return (elem.id != id)
    } )
    console.log(todoList)
    fs.writeFileSync(filePath,JSON.stringify(todoList))
    res.send(todoList)
}



function list(req , res) {
    let todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const key = req.query.key
    switch (key) {
        case "all":
            break;
        case "checked":
            todoList = todoList.filter((elem)=>elem.checked)
            break;
        case "unchecked":
            todoList = todoList.filter((elem)=>!(elem.checked))
            break;
        default:
            break;
    }
    res.send(todoList)
}



function check(req ,res) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const id = req.params.id
    todoList.map((elem)=>{
        if (elem.id == id) {
            elem.checked = true
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList))
    res.send(todoList)
}



function uncheck(req ,res) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const id = req.params.id
    todoList.map((elem)=>{
        if (elem.id == id) {
            elem.checked = false
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList))  
    res.send(todoList)
}



module.exports = {add , edit , remove , list , check , uncheck}


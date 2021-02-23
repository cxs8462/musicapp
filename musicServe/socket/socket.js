module.exports = app =>{
    const io = require('socket.io')(app,{cors:true})

    console.log('io服务开启')
    const moment = require('moment')
    let list = []
    const message = []

    io.on('connection',socket=>{
        console.log('有人连接')

        let user = ''
        socket.on('login',obj=>{
            if(list.some(item=>item.id===user.id)) return
            list.push(obj)

            user = obj

            io.emit('loginComplete')
            io.emit('person',list)
            io.emit('enter',`欢迎${user.name}进入聊天室！`)
        })
        
        socket.on('message',obj=>{
            console.log(obj)
            if(obj.name){
                message.push({user,obj})
            }else{
                message.push({user,message:obj})
            }
            const date = new Date()
            const time = {
                date:moment(date).format('YYYY年MM月DD日'),
                time:moment(date).format('HH:mm:ss'),
                init:date.getTime()
            }
            if(obj.name){
                io.emit('message',{time,user,detail:obj})
            }else{
                io.emit('message',{time,user,message:obj})
            }
        })
        socket.on('disconnect',obj=>{
            console.log('leave')
            
            if(user) list = list.filter(r=>r.id!==user.id)
            
            io.emit('person',list)

            io.emit('enter',`${user.name}离开了聊天室！`)
        })
    })


}
const fs = require('fs');
const {dataparse} = require('../merakiJosn/jsonMeraki')
var data = dataparse()

const CreateUser = (req,res)=>{
    try {
        let info = data['availableCourses']
        info.push(req.body)
        fs.writeFileSync('./merakiCrud/merakiData.json',JSON.stringify(data,null,4))
        res.json({message:"Data Inserted Successfully...."})
    } catch (error) {
        res.json({mesg:error.message})
    }
}

const ReadUser = (req,res)=>{
    try {
        let AllUserId = [];
        for(let user_data of data['availableCourses']){
            AllUserId.push(user_data.id)
        }
        if(AllUserId.includes(req.params.id)){
            for(let userInfo of data['availableCourses']){
                if(userInfo.id == req.params.id){
                    res.json({message:userInfo})
                }
            }
        }else{
            res.json({message:'User Data Not Found'})
        }
    } catch (error) {
        res.json({message:error.message})   
    }
}

const UpdateUser = (req,res)=>{
    try {
        let {name,type,logo,short_description} = req.body
        let allUserId = [];
        for(let user_data of data['availableCourses']){
            allUserId.push(user_data.id)
        }
        if(allUserId.includes(req.params.id)){
            for(let userInfo2 of data['availableCourses']){
                if(userInfo2.id == req.params.id){
                    const updateData = function(name=userInfo2.name,type=userInfo2.type,logo=userInfo2.logo,short_description=userInfo2.short_description){
                        userInfo2['name'] = name
                        userInfo2['type'] = type
                        userInfo2['logo'] = logo
                        userInfo2['short_description'] = short_description
                        fs.writeFileSync('./merakiCrud/merakiData.json',JSON.stringify(data,null,4))
                        res.json({message:'Update Successfully...'})
                    }
                    updateData(name,type,logo,short_description)
                }
            }
        }else{
            res.json({message:'User Data Not Found'})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

const deleteUser = (req,res)=>{
    try {
        let AllUserId = [];
        for(let user_data of data['availableCourses']){
            AllUserId.push(user_data.id)
        }
        if(AllUserId.includes(req.params.id)){
            for(let userInfo of data['availableCourses']){
                if(userInfo.id == req.params.id){
                    let index = data['availableCourses'].indexOf(userInfo)
                    data['availableCourses'].splice(index,1)
                    fs.writeFileSync('./merakiCrud/merakiData.json',JSON.stringify(data,null,4))
                    res.json({message:'User Deleted Successfully...'})
                }
            }
        }else{
            res.json({message:'User Data Not Found'})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports = {
    CreateUser,
    ReadUser,
    UpdateUser,
    deleteUser
}
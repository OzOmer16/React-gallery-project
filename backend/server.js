const express = require("express")
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const server = express()

server.use(cors())
server.use(express.json())
const storage = multer.diskStorage({
    destination: function (req,file,callback) {
        callback(null,"../public/images")
        
    },
    filename: function(req,file,callback){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split("/")[1])
    }
})

const upload = multer({
    storage: storage,
    limits:{fieldSize: 1000000},
    fileFilter: function(req,file,callback){
   
        const allowedExtensions = [".jpg",".jpeg",".png",".gif"]
        const isAllowedFileExtension = allowedExtensions.includes(path.extname(file.originalname))
      
        if(isAllowedFileExtension){
            return callback(null,true)
        }
        callback("Error: Wrong file type")
    }
}).single("singleFile")


server.get("/",(req,res)=>{
    res.send("it works well")
})

server.get("/files",(req,res)=>{
    fs.readdir("../public/images",(err,files)=>{
        if(err){
            res.json({error: "We could not get all the files. Please try again"})
            return
        }

        const paths = []
        const filePaths = files.reduce((prev,curr)=>{
            const path = "images/" + curr
            paths.push(path)
            return paths
        },[])
     
        res.json({filePaths})

        
    })
})


server.post("/upload",(req,res)=>{
    
    upload(req,res,(err)=>{
        if(err){
            res.json({error: "Error: We could not upload the file. Please try again"})
            return
        }

        if(!req.file){
             res.json({error: "Error: File does not exist"})
             return
        }
        res.json({image: `images/${req.file.filename}`})
    })

})



server.delete("/files/:id",(req,res)=>{
    fs.unlink(`../public/images/${req.params.id}`,(err)=>{
        if(err){
            res.json({error: "We could not remove the file. Please try again"})
            return
        } 
        res.json({desc: "The file has been successfully removed"})

    })

})


server.delete("/files",(req,res)=>{

    fs.rmdir("../public/images",{recursive:true},(err)=>{
        if(err){
            res.json({error: "Error: We could not remove all the files. Please try again"})
            return
        }

        fs.mkdir("../public/images",(err)=>{
            if(err){
                res.json({error: "Error: We could not remove all the files. Please try again"})
                return
            }

            res.json({desc: "All files have been successfully removed"})

        })

    })

})




server.listen(8080,()=>{
    console.log("Server is running on port 8080")
})
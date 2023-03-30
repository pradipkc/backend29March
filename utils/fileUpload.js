const multer = require('multer')
// fs = file system
const fs = require('fs')
// path - access file path
const path = require('path')
const router = require('../routes/ProductRoute')

const myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = 'public/upload'
        if(!fs.existsSync(dest)){
            fs.mkdirSync(dest,{recursive:true})
        }
      cb(null, dest)
    },
    filename: function (req, file, cb) {
        // iphone.jpeg - originalname
        // ext - .jpeg
        let ext = path.extname(file.originalname)
        let basename = path.basename(file.originalname,ext)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let filename = basename+uniqueSuffix
    //   iphone125425555-111111111.jpeg
      
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const myfileFilter = (req, file,cb) => {
    if(!file.originalname.match(/\.(jpeg|JPEG|png|PNG|gif|GIF|jpg|JPG|jfif|JFIF)/)){
      return cb(new Error("You can upload image files only"),false)
    }
    cb(null, true)
  }
  
  const upload = multer({ 
    storage: myStorage,
    limits :{
        fileSize: 2000000
    },
    fileFilter: myfileFilter
})
module.exports = upload

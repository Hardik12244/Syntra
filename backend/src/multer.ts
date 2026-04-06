import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        const uniquename = Date.now() + "-" + file.originalname;
        cb(null,uniquename)
    },
});

export const upload = multer({storage})
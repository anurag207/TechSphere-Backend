const mongoose=require('mongoose');
const uri=`mongodb+srv://anuragkamboj20:test1234@cluster0.cqrhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri,{
    dbName: "TECHSPHERE"
}).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log('MongoDB Connection Error\n',err);
    
})
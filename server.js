import express from 'express';
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World!!');
});

app.post("/",(req,res)=>{
    console.log(req);
    res.json({message:'data recieved',data:req.body});
});

app.listen(5100,()=>{
    console.log('Server is running...');
})



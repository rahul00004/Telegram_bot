const Telegraf = require('telegraf')
const telegraf_token=""
const bot =new Telegraf(telegraf_token)
const mysql = require('mysql')
var x = 0;
var y = 0
var z = 0
var name;
var college;
var lan =[];
var lan_point=0;
var framework=[];
var frame_point=0;
var project_point=0;
var confidence_point=0;
var confidence_level;
var  known_sideProject;
var result;
var github;
var language
var frame

//connecting database
const conn  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"telegram_bot"
} )


conn.connect(function(error){
    if(error){
        throw error;
    }
    console.log("connected");
   
    
})

//start command
bot.start((ctx) => {
    ctx.reply("Hello I am chichibot ,What your name ")
})
bot.on('message', (ctx) => 
     {
        if (x == 0) {
            name = ctx.message.text
            ctx.reply("Which college are you from?")
            x++
        }
        else if (x == 1) {
            college = ctx.message.text
           
            const keyboard = [
                ['Friends'],
                ['Whatsapp Group'],
                ['LinkedIn'],
                ['Facebook']
            ];
            ctx.reply('How did you get to know about SideProjects?', { reply_markup: { keyboard, one_time_keyboard: true } });
            x++
        }
            
        
        
  



    else if (x == 2) {
     know_sideProject = ctx.message.text
        const keyboard = [
            
            ['Java'],
            ['JavaScript'],
            ['Python'],
            ['CSS'],
            ['C++'],
            ['C'],
            ['C#'],
            ['HTML'],
            ['HTML5'],
            ['PHP'],
            ['Objective C'],
            ['SQL'],
            ['R'],
            ['Ruby'],['Submit']
        ];
        ctx.reply('Which programming languages do you know?', { reply_markup: { keyboard}})
       
        
        x++
    }
    else if(ctx.message.text !='Submit' && x==3){
        console.log(ctx.message.text);
        lan.push(ctx.message.text)
        
        
        
    }

    else if(ctx.message.text==='Submit')
    
    {
        language=lan
        if (lan.length<=3){
            console.log(lan.length);
            
            lan_point=5
            
        }
        else if(lan.length<=6 && lan.length>=4){
          console.log(lan.length);
            
            lan_point=7
        }
        else if(lan.length<=14 && lan.length>=7){
          console.log(lan.length);
  
            lan_point=10
        }

        
        
        
        
    ctx.reply('Do you know any frameworks? Please list them,and type done');
    x++
        
    }
    else if(x==4 && ctx.message.text!="done"){
        framework.push(ctx.message.text)
        
    }
    else if (ctx.message.text==='done' ||ctx.message.text==='Done'  ){
        frame=framework
        if(framework.length>=4){
            frame_point=10
        }
        else if(framework.length>=2 && framework.length<=3){
            frame_point=7
        }
        else{
            frame_point=4
        }
        console.log(frame_point);
        
        
        const keyboard = [
            ["yes"],["no"]
        ];
       ctx.reply("Have you previously done any projects?",{reply_markup:{keyboard}})
        x++
    }
    else if (ctx.message.text==="yes" || ctx.message.text=='no' &x===5){
        know_sideProject=ctx.message.text
      
        project_done=ctx.message.text
        if(ctx.message.text==="yes"){
            project_point=5
        }
        else{
            project_point=0
        }
        const keyboard = [
            ["learning"],["confident enough"],["very confident"]
        ]
        ctx.reply(" How confident are you about your programming skills?",{reply_markup:{keyboard}})
    }
    else if(ctx.message.text==="learning" || ctx.message.text==="confident enough" || ctx.message.text==="very confident")
    {
        confidence_level=ctx.message.text    
        if(ctx.message.text==="learning"){
            confidence_point=2

        }
        else if (ctx.message.text==="confident enough"){
            confidence_point=4

        }
        else{
            confidence_point=5

        }
        ctx.reply("Please share your github repository for us to keep a track of your work.")
        
        
        y++
    }
    else if(ctx.message.text!=""  && y===1){
    github=ctx.message.text

    
     
      total=lan_point+confidence_point+project_point+frame_point

    if(total>=22)
    {
        ctx.reply("You should be on level 4")
        result="You should be on level 4"

    }
    else if(total<22 && total>15){
        ctx.reply("You should be on level 3")
        result="You should be on level 3"
    }
    else if(total<15 && total>10){
        ctx.reply("You should be on level 2")
        result="You should be on level 2"
    }
    else{
        ctx.reply("you should begin as level 1")
        result="You should be on level 1"
    }
    console.log(name);

    console.log(college);
    console.log(know_sideProject);
    console.log(lan);
    console.log(framework);
    console.log(github);
    console.log(project_done);
    
    

    


  var sql = " INSERT INTO `bot` VALUES (null, '"+ name +"', '"+ college +"', '"+ known_sideProject +"', '"+ language +"', '"+ frame +"', '"+ project_done +"', '"+ confidence_level +"', '"+ github +"', '"+ result +"')"

  
  
  
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("1 entry successful")
        }
    })
}



    

})






bot.launch  ()
// API to try mongo searches ==============================================

app.get('/complex', async (req,res)=>{
    const users = await TrySchema.find({}).sort('lastName').then(result=>{
      console.log(result)
    });
    const ages= await TrySchema.find({age:{$gte:100}}).sort('age').then(result=>{
      // console.log(result)
    })
  
    const bigNames = await TrySchema.find({$where: 'this.firstName.length>5'}).then(result =>{
      // console.log(result)
    })
  
    const avg = await TrySchema.aggregate([
      {$group: {_id: null, avg:{$avg:'$age'}}}]).
      then(
        result=>{
            // console.log(result[0].avg)
      })
    
    const more = await TrySchema.aggregate([{
      $match:{age: {$gte:50} }
    },
    {
      $group:{_id:null,count:{$sum:1}}
    }
  ]).exec((err,results)=>{
    if(err){
      console.log(err)
    }else{
      const count = results.length >0 ? results[0].count:0;
      //console.log(`There are ${count} people over 50.`)
    }
  });
  
  const select = await TrySchema.find({}).select ('firstName age').exec((err,results)=>{
    if (err){
      console.error(err);
    }else{{
      // console.log(results)
    }}
  })
  
  
  const countLongNames = await TrySchema.aggregate([
    {
      $match: {
        firstName: { $exists: true }, // Ensure firstName field exists
        $expr: { $gte: [{ $strLenCP: '$firstName' }, 5] }, // Compare firstName length to 5
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 }, // Count the matched documents
      },
    },
  ]).exec((err, results) => {
    if (err) {
      console.error(err);
    } else {
      const count = results.length > 0 ? results[0].count : 0;
      //console.log(`Number of documents with firstName longer than 5 characters: ${count}`);
    }
  })
  
  
  const getusers = await TrySchema.find({$and:[{age:{$gte: 20}},{$where: function (){return this.firstName.length>6}}]})
    .exec((err,result)=>{
      if(err){
        console.error(err);
      }else{
        //console.log(result)
      }
    })
  
  const countUsers = await TrySchema.aggregate([{$group:{_id:null, sum:{$sum:'$age'}}}]).exec((err,result)=>{
    if(err){
      console.error(err)
    }else{
      //console.log(result)
    }
  })
  
  const countUsersOver30 = await TrySchema.aggregate([
    {
      $match :{
        age: {$gte:70}}
      }
    ,
    {
      $group:{
        _id:null, sum: {$sum:'$age'}
      }
    }]).exec((err,results)=>{
      if(err){
        console.error(err)
      }else{
        console.log("this is the result",results)
      }
    })
  
  
  
    res.status(200).json({message: "at least it returns something"})
  })
  
  app.get('/mongo', async (req,res)=>{
    const user = await User.find({
      $or:[{username:'try'},{ $where: function () { return this.email.length > 3; } }]})
      .then(result =>{
      console.log(result)
    })
    //console.log(user)
    res.status(200).json({message: "at least it returns something"})
  })



  app.post('/schemaCreate', async (req,res)=>{
    console.log("this is an endpoint to try some mongo related queries etc")
    const {firstName,lastName, age}  = req.body;
    const user = new TrySchema({firstName:firstName,lastName:lastName,age:age})
    console.log(user)
    console.log("___________________________")
    // await user.save();
    // console.log(user);
    console.log("___________________________")
    const usersOver30 = await TrySchema.find({age: {$gte :60}});
    console.log("Over 60",usersOver30);
    console.log("___________________________")
    // const allUsers = await TrySchema.find({});
    // console.log(allUsers);
    // console.log("___________________________")
    console.log("___________________________")
    const usersBetween33and55 = await TrySchema.find({$and:[{age:{$gte:35}},{age:{$lte:70}}]});
    console.log("Bewteen 35 and 70",usersBetween33and55);
    console.log("___________________________")
  
    console.log("___________________________")
    const userswithage35and54 = await TrySchema.find({$or: [{age:35},{age:54}]});
    console.log("With ages 35 and 54",userswithage35and54);
    console.log("___________________________")
  
    console.log("___________________________")
    const avg = await TrySchema.aggregate([
      { $group : {_id:null, avg : {$avg: "$age"}}}
    ]);
    console.log("Average",avg[0].avg);
    console.log("___________________________")
    const nameBiggerthan3 = await TrySchema.find({$where: "this.lastName ==='Hilton'"});
    console.log("Name longer than 4",nameBiggerthan3);
    console.log("___________________________")
    // await TrySchema.updateOne({firstName: "Dimitri"},{age: 434});
    // let x = await TrySchema.findOne({firstName: "Dimitri"});
    // console.log(x)
    // console.log("___________________________")
    // let after = await TrySchema.find()
    // console.log(after)
    // console.log("___________________________")
    res.status(200).json({message :"it works"})
  })
  
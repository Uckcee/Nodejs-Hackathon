const userModel = require('../model/user.model')
const Wallet = require('../model/wallet.model')

exports.getUserRoutes = async (req, res) => {
    try {
      const userId = req.userId
      const users = await userModel.find({userId:userId})
      res.send({users})
        
    } catch (error) {
      console.log(error)
        
    }
}

exports.getOneUser = async (req, res) => {
  try{
    const {id} = req.params
    if(id){
      const user = await userModel.findById(id)
      if(user){
        return res.send({
          status: true,
          message: "User found",
          data: user
        })
      } else {
        return res.send({
          status: false,
          message: "User not found"
        })
      }
    }else {
      return res.send({
        status: false,
        message: "ID is required"
      })
    }
    
  } catch (error) {
    console.log(error)

  }
}

exports.postUserRoute = async (req, res) => {
  try {

      const userId = req.userId
      const {name, username, password, email, phoneNum} = req.body
      const newUser = new userModel({
        name: name,
        username: username,
        password: password,
        email :  email,
        phoneNum: phoneNum,
        userId: userId
      })
      
      const savedUser = await newUser.save()
      const {owner, balance, walletId} = req.body
      const newWallet = new Wallet({
        owner: savedUser.userId,
        balance: balance,
        walletId: walletId,
      });

      const savedWallet = await newWallet.save()
      if(savedWallet){
         return res.send({
          //  newUser,
           savedWallet,
           status: true,
           message: "User and wallet created successfully",
         });
      }else {
         return res.send({
           status: false,
           message: "Internal server error",
         });
      }
      

    //  res.send({newUser})
  } catch (error) {
    console.log(error)
    
  }
}
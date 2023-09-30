const userModel = require('../model/user.model')
const Wallet = require('../model/wallet.model')
const bcryptJs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.Login =async (req, res) => {
    try{
      const userId = req.userId
      const {email, username, password} = req.body
      if(!username){
            return res.send({
                status: false,
                message: "Username field is required"
            })
        } 
        
        if (!email) {
          return res.send({
            status: false,
            message: "Email field is required",
          });
        
        } if (!password) {
          return res.send({
            status: false,
            message: "password field is required",
          });
        }

        const user = await userModel.findOne({email:email, username: username})
        if(user){
          const validPassword = await bcryptJs.compare(password, user.password)
          if(!validPassword){
             return res.send({
               status: false,
               message: "Invalid credentials provided",
             });
          }
          if(validPassword){
            const token = jwt.sign({id: user.id}, '098765', {
              expiresIn:'45mins'
            })
            return res.send({
              status : true,
              message: 'Successful',
              data: {
                token: token,
                user: {
                  email: user.email,
                  userId: user.id
                }
              }
            })
          }
        }else{
          return res.send({
            status: false,
            message: "User does not exist"
          })
        }
    }catch (error) {

    }
}

exports.Register = async (req, res) => {
    try {
        const {name, username, email, password} = req.body
        if(!name){
            return res.send({
                status: false,
                message: "Name field is required"
            })
        } if(!username){
            return res.send({
                status: false,
                message: "Username field is required"
            })
        } 
        

        if (!email) {
          return res.send({
            status: false,
            message: "Email field is required",
          });
        
        } 
        const userExist = await userModel.findOne({
          email: email, 
          username: username
        })
        if(userExist){
          return res.send({
            status: false,
            message: "User already exist" 
          })
        }
        
        if (!password) {
            return res.send({
              status: false,
              message: "password field is required",
            });
          }
          const encrypt = await bcryptJs.genSalt(15)
          const encryptPassword = await bcryptJs.hash(password, encrypt)

          const userId = req.userId;
          const newUser = new userModel ({
            name : name,
            username : username,
            email: email,
            password: encryptPassword
          })
          // const user = await newUser.save()
          // if(user){
          //   return res.send ({
          //       status: true,
          //       message:"Registration Successful"
          //   })
          // }else {
          //   return res.send ({
          //       status:false,
          //       message: "Registration Unsuccessful"
          //   })
          // }
         const savedUser = await newUser.save();
         const { owner, balance} = req.body;
         const newWallet = new Wallet({
           owner: savedUser.userId,
           balance: 0
           
         });
              // Create a wallet for the user
          const savedWallet = await newWallet.save()
          if(savedWallet){
         return res.send({
           status: true,
           message: "User and wallet created successfully",
         });
        }else {
         return res.send({
           status: false,
           message: "Internal server error",
         });
      }

    } catch(error) {
        console.log(error)

    }
}


const Wallet = require("../model/wallet.model")
const User = require("../model/user.model")
// const Transaction = require("../model/transactions.model");


exports.createWallet = async (req, res) => {
  try {
    const userId = req.userId

  
    const existingWallet = await Wallet.findOne({ owner: userId });
    if (existingWallet) {
      return res.send({ 
        message: "User already has a wallet" 
      });
    }

    const newWallet = new Wallet({ owner: userId, balance: 0 });
    await newWallet.save();

    const user = await User.findById(userId);
    user.wallet = newWallet._id;
    await user.save();

    return res.send({newWallet});
  } catch (error) {
    console.error("Error creating wallet:", error);
    return res.send({ message: "Internal server error" });
  }
};

exports.getWalletDetails = async (req, res) => {
  try {
   
    const userId = req.userId

    // Find the user's wallet and populate it with details
    const wallet = await Wallet.findOne({ owner: userId }).populate(
      "owner",
      "username email"
    );

    if (!wallet) {
      return res.send({ 
        status: false,
        message: "Wallet not found"
       });
    }

    return res.send({wallet});
  } catch (error) {
    console.error("Error getting wallet details:", error);
    return res.send({ message: "Internal server error" });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const userId = req.userId

      const wallet = await Wallet.findOne({ owner: userId });

      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      const { amount, action } = req.body

      if (action === "deposit") {
         res.send({ message: "Deposit successful, wallet balance updated" });
          wallet.balance += amount   

      } else if (action === "withdraw") {
        if (wallet.balance < amount) {
          return res.send({
            status: false,
            message: "Insufficient funds for withdrawal"
          })
          
        }
        wallet.balance -= amount;
      } else {
        return res.send({ message: "Invalid action" });
      }

      await wallet.save();

      return res.send({ message: "Withdraw successful, wallet balance updated" });

  }catch(error) {

  }
}


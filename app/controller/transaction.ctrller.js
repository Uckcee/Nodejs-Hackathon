const Wallet = require("../model/wallet.model");
const Transaction = require("../model/transactions.model");

exports.transfer = async (req, res) => {
  try {
    const { senderId, receiverId, amount, remark } = req.body;

    // Retrieve sender and receiver wallets
    // const userId = req.userId
    // let senderWallet = await Wallet.findOne({ userId: senderId });
    // let receiverWallet = await Wallet.findOne({ userId: receiverId});
    
    const userId = req.userId
    const senderWallet = await Wallet.findById(userId);
    const receiverWallet = await Wallet.findById(userId);

    if (!senderWallet || !receiverWallet) {
      return res.send ({
        status: false,
        message: "Sender or receiver wallet not found"
      })
       
    }

    if (senderWallet.balance < amount) {
      return res.send ({
        status: false,
        message: "Insufficient amount for the transfer"
      })
        
    }

    // Update sender and receiver wallet balances
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    // Save the updated wallet balances
    await senderWallet.save();
    await receiverWallet.save();

    // Create a transaction record
    const transaction = new Transaction({
      sender: senderId,
      receiver: receiverId,
      amount,
      date: new Date.now(),
    });

   const saveTransaction = await transaction.save()
   if(saveTransaction){
    return res.send({
        message: "Transfer successful"
    });
}
   }catch (error) {
    console.error("Error transferring funds:", error);
    return res.status(500).json({ message: "Internal server error" })
  }
}

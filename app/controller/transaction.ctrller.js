const Transaction = require("../model/transactions.model");
const Wallet = require("../model/wallet.model");
const User = require("../model/user.model");

exports.createTransaction = async (req, res) =>  {
  try {
    const { sender, receiver, amount, remark } = req.body;

    const userId = req.userId;
    // const {id} = req.params
    
    // const senderWallet = await Wallet.findOne({ owner: userId });
    // const receiverWallet = await Wallet.findOne({owner: userId});
    const senderWallet = await Wallet.findById(sender);
    const receiverWallet = await Wallet.findById(receiver);

    if (!senderWallet ) {
      return res
        .status(404)
        .json({ message: "Sender wallet not found" });
    }

     if ( !receiverWallet) {
       return res
         .status(404)
         .json({ message: "Receiver wallet not found" });
     }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Create a new transaction
    const transaction = new Transaction({
      sender: senderWallet.owner,
      receiver: receiverWallet.owner,
      amount,
      remark: remark,
      date: new Date(),
    });

    // Update wallet balances
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    // Save the updated wallet balances and the transaction
    await senderWallet.save();
    await receiverWallet.save();
    await transaction.save();

    return res
      .status(201)
      .json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get a list of transactions
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all transactions involving the user (either as a sender or receiver)
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ date: "desc" });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


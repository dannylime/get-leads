const mongoose = require("mongoose");
const LubelskieModel = require("./models/Lodzkie");

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://angeldusthope7:X3sp1gsw89@clients.nccw8ai.mongodb.net/customer?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function removeDuplicates() {
  try {
    // Find documents with duplicate "googleUrl" values
    const duplicates = await LubelskieModel.aggregate([
      {
        $group: {
          _id: "$googleUrl",
          count: { $sum: 1 },
          docs: { $push: "$_id" },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    // Iterate through duplicates and keep one document while deleting the others
    for (const duplicate of duplicates) {
      const docIds = duplicate.docs.slice(1); // Keep the first document, remove the rest
      await LubelskieModel.deleteMany({ _id: { $in: docIds } });
    }

    console.log("Duplicates removed successfully.");
  } catch (error) {
    console.error("Error removing duplicates:", error);
  } finally {
    mongoose.connection.close(); // Close the database connection when done
  }
}

removeDuplicates();

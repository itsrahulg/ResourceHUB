const Document = require("../models/Document");
const path = require("path");
const mongoose = require('mongoose');


// Upload a document
// exports.uploadDocument = async (req, res) => {
//   try {
//     const { title, department, semester, subject, description } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "File upload is required" });
//     }

//     const document = new Document({
//       title,
//       department,
//       semester,
//       subject,
//       description,
//       fileUrl: `/documents/${req.file.filename}`, // Store file path
//       user: req.user.id // ✅ Ensure this is stored!
//     });

//     await document.save();
//     res.status(201).json({ message: "Document uploaded successfully", document });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

// const uploadDocument = async (req, res) => {
//   try {
//     const { title, department, semester, subject, description } = req.body;
//     const fileUrl = req.file.path; // Ensure multer stores the file

//     const newDocument = new Document({
//       title,
//       department,
//       semester,
//       subject,
//       description,
//       fileUrl,
//       user: req.user.id // ✅ Ensure this is stored!
//     });

//     await newDocument.save();
//     res.status(201).json({ message: "Document uploaded successfully", newDocument });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.uploadDocument = async (req, res) => {
  try {
    console.log("📂 Upload request received:", req.body);

    const { title, department, semester, subject, description } = req.body;

    if (!req.file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("✅ File uploaded:", req.file.filename);

    // ✅ Fix: Set `userId` properly
    const newDocument = new Document({
      title,
      department,
      semester,
      subject,
      description,
      fileUrl: req.file.path,
      userId: req.user.userId, // ✅ Ensure this is set
    });

    await newDocument.save();
    console.log("📄 Document saved:", newDocument);
    res.status(201).json({ message: "Document uploaded successfully", document: newDocument });

  } catch (error) {
    console.error("❌ Error in uploadDocument:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Ensure `getAllDocuments` is exported
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    if (!Array.isArray(documents)) {
      return res.status(500).json({ error: "Expected an array but got something else" });
    }

    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Server error" });
  }
};










// exports.getUserDocuments = async (req, res) => {
//   try {
//     console.log("✅ User ID from token:", req.user.userId);
    
//     const documents = await Document.find({ userId: req.user.userId });

//     console.log("📄 Documents Found:", documents);
//     res.json(documents);
//   } catch (error) {
//     console.error("❌ Error fetching user documents:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.getUserDocuments = async (req, res) => {
//   try {
//     console.log("✅ User ID from token:", req.user.userId);
    
//     // Fetch documents where the user ID matches
//     // const documents = await Document.find({ user: req.user.userId });
//     const documents = await Document.find({ userId: new mongoose.Types.ObjectId(userId) });

//     console.log("📄 Documents Found:", documents);
//     res.json(documents);
//   } catch (error) {
//     console.error("❌ Error fetching user documents:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


exports.getUserDocuments = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the userId from the token
    console.log("✅ User ID from token:", userId);
    
    // Use the userId directly; Mongoose will cast it appropriately.
    const documents = await Document.find({ userId });
    
    console.log("📄 Documents Found:", documents);
    res.json(documents);
  } catch (error) {
    console.error("❌ Error fetching user documents:", error);
    res.status(500).json({ error: "Server error" });
  }
};





// Delete a document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    await Document.findByIdAndDelete(id);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Server error" });
  }
};






// to get the user metrics for the documents
exports.getUserDocumentMetrics = async (req, res) => {
  try {
    const userId = req.user.userId; // userId extracted from token
    // Aggregate metrics for documents uploaded by this user
    const metrics = await Document.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          totalUploads: [{ $count: "count" }],
          monthlyUploads: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$uploadedAt" } },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ],
          documentTypes: [
            {
              $project: {
                extension: {
                  $toLower: { $arrayElemAt: [{ $split: ["$fileUrl", "."] }, -1] }
                }
              }
            },
            {
              $group: {
                _id: "$extension",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ]
        }
      }
    ]);

    const result = {
      totalUploads: metrics[0].totalUploads[0] ? metrics[0].totalUploads[0].count : 0,
      monthlyUploads: metrics[0].monthlyUploads,
      documentTypes: metrics[0].documentTypes
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching document metrics:", error);
    res.status(500).json({ error: "Server error" });
  }
};

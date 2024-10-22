
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config(); // Load environment variables
// const Stripe = require('stripe') 

// const Stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// const app = express();
// app.use(cors());
// app.use( express.json({ limit: "10mb" }));

// const PORT = process.env.PORT || 8087;

// // MongoDB connection
// mongoose.set("strictQuery", false);
// console.log("MongoDB URI:", process.env.MONGODB_URL); // Log MongoDB URI
// console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("Connected to Database"))
//   .catch((err) => console.error("Database connection error:", err));

// // User schema
// const userSchema = mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   confirmPassword: String,
//   image: String,
// });

// const userModel = mongoose.model("user", userSchema);

// // API root
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running" });
// });

// // Sign up
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await userModel.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email ID is already registered", alert: false });
//     }

//     const newUser = new userModel(req.body);
//     await newUser.save();
//     res.status(201).json({ message: "Successfully signed up", alert: true });
//   } catch (err) {
//     console.error("Sign-up error:", err);
//     res.status(500).json({ message: "Internal Server Error", alert: false });
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await userModel.findOne({ email });

//     if (user) {
//       const { _id, firstName, lastName, image } = user;
//       return res.json({
//         message: "Login is successful",
//         alert: true,
//         data: { _id, firstName, lastName, email, image },
//       });
//     } else {
//       return res.status(404).json({ message: "Email is not available, please sign up", alert: false });
//     }
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Product schema
// const schemaProduct = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   category: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   image: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (v) {
//         return /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm.test(v) || v.startsWith('data:image/');
//       },
//       message: (props) => `${props.value} is not a valid URL or base64 image string!`,
//     },
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: [0, 'Price must be positive'],
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
// });

// const productModel = mongoose.model("Product", schemaProduct);

// // Upload product
// // app.post("/uploadProduct", async (req, res) => {
// //   try {
// //     const newProduct = new productModel(req.body);
// //     await newProduct.save();
// //     res.status(201).json({ message: "Product uploaded successfully" });
// //   } catch (err) {
// //     console.error("Product upload error:", err);
// //     res.status(500).json({ message: "Error uploading product" });
// //   }
// // });

// app.post("/uploadProduct", async (req, res) => {
//   try {
//      console.log("Product data:", req.body); // Log the incoming product data
//     const newProduct = new productModel(req.body);
//     await newProduct.save();
//     res.status(201).json({ message: "Product uploaded successfully" });
//   } catch (err) {
//     console.error("Product upload error:", err.message, err.stack);
//     res.status(500).json({ message: "Error uploading product", error: err.message });
//   }
// });


// // Get all products
// app.get("/product", async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json(products);
//   } catch (err) {
//     console.error("Error retrieving products:", err);
//     res.status(500).json({ message: "Error retrieving products" });
//   }
// });

// /***** Payment Gateway *****/
//  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create checkout session
// // app.post("/create-checkout-session", async (req, res) => {
// //   try {
// //     if (!Array.isArray(req.body)) {
// //       return res.status(400).json({ message: "Invalid request format" });
// //     }

// //     const params = {
// //       submit_type: 'pay',
// //       mode: "payment",
// //       payment_method_types: ['card'],
// //       billing_address_collection: "auto",
// //       shipping_options: [{ shipping_rate: "shr_1QCGuAJfaBLULodZQbrBegX2" }],
// //       line_items: req.body.map((item) => ({
// //         price_data: {
// //           currency: "inr",
// //           product_data: {
// //             name: item.name,
// //           },
// //           unit_amount: item.price * 100,
// //         },
// //         adjustable_quantity: {
// //           enabled: true,
// //           minimum: 1,
// //         },
// //         quantity: item.qty,
// //       })),
// //       success_url: `${process.env.FRONTEND_URL}/success`,
// //       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
// //     };

// //     const session = await stripe.checkout.sessions.create(params);
// //     res.status(200).json({ sessionId: session.id });
// //   } catch (err) {
// //     console.error("Stripe error:", err);
// //     res.status(err.statusCode || 500).json({ message: err.message });
// //   }
// // });
// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     // Validate that the request body is an array of items
//     if (!Array.isArray(req.body) || req.body.length === 0) {
//       return res.status(400).json({ message: "Invalid request format. Expected an array of items." });
//     }

//     // Construct the session parameters
//     const params = {
//       submit_type: 'pay',
//       mode: 'payment',
//       payment_method_types: ['card'],
//       billing_address_collection: 'auto',
//       shipping_options: [{ shipping_rate: 'shr_1QCGuAJfaBLULodZQbrBegX2' }],
//       line_items: req.body.map((item) => ({
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100, // Convert price to the smallest currency unit (paise)
//         },
//         adjustable_quantity: {
//           enabled: true,
//           minimum: 1,
//         },
//         quantity: item.qty,
//       })),
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     };

//     // Create the checkout session
//     const session = await stripe.checkout.sessions.create(params);
//     console.log(session);
    

//     // Respond with the session ID
//     res.status(200).json({ sessionId: session.id });
//   } catch (err) {
//     console.error("Stripe error:", err);
//     res.status(err.statusCode || 500).json({ message: `Stripe error: ${err.message}` });
//   }
// });


// // Start the server
// app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const Stripe = require('stripe'); // Correct import

// Initialize Stripe using the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8087;

// MongoDB connection
mongoose.set("strictQuery", false);
console.log("MongoDB URI:", process.env.MONGODB_URL); // Log MongoDB URI
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Database connection error:", err));

// User schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// API root
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Sign up
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email ID is already registered", alert: false });
    }

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "Successfully signed up", alert: true });
  } catch (err) {
    console.error("Sign-up error:", err);
    res.status(500).json({ message: "Internal Server Error", alert: false });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const { _id, firstName, lastName, image } = user;
      return res.json({
        message: "Login is successful",
        alert: true,
        data: { _id, firstName, lastName, email, image },
      });
    } else {
      return res.status(404).json({ message: "Email is not available, please sign up", alert: false });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Product schema
const schemaProduct = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm.test(v) || v.startsWith('data:image/');
      },
      message: (props) => `${props.value} is not a valid URL or base64 image string!`,
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive'],
  },
  description: {
    type: String,
    trim: true,
  },
});

const productModel = mongoose.model("Product", schemaProduct);

// Upload product
app.post("/uploadProduct", async (req, res) => {
  try {
    console.log("Product data:", req.body); // Log the incoming product data
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (err) {
    console.error("Product upload error:", err.message, err.stack);
    res.status(500).json({ message: "Error uploading product", error: err.message });
  }
});

// Get all products
app.get("/product", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (err) {
    console.error("Error retrieving products:", err);
    res.status(500).json({ message: "Error retrieving products" });
  }
});

/***** Payment Gateway *****/

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Validate that the request body is an array of items
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Invalid request format. Expected an array of items." });
    }

    // Construct the session parameters
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [{ shipping_rate: 'shr_1QCGuAJfaBLULodZQbrBegX2' }],
      line_items: req.body.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert price to the smallest currency unit (paise)
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(params);
    console.log(session);

    // Respond with the session ID
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(err.statusCode || 500).json({ message: `Stripe error: ${err.message}` });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));

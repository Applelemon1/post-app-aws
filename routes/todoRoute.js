const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");
const collection = require("../models/accountModel");

router.route("/").get((req, res) => {
  res.json({ success: true });
});

router.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const check =  collection.findOne({ email: email }).then((user) => {
      console.log("user", user);
      if(user && password === user.password){
        res.json("exist");
      }else if(user && password !== user.password){
        res.json("password wrong");
      }else{
        res.json("notexist");
      }

    // if (check) {
    //     // console.log("password correct");
    //  res.json("exist");
    //   } else {
    //     console.log("password wrong");
    //     res.json("notexist");
    //   }
    });
  
  } catch (e) {
    res.json("fail");
  }
});
router.route("/signup").post(async (req, res) => {

  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});
router.route("/create").post(async (req, res) => {
  console.log('hoho')
  const title = req.body.title;
  const image = req.body.image;
  const whoPost = req.body.whoPost
  const temp = await new Todo({ title: title, image:image, whoPost:whoPost });
  await temp.save();
  return res.json({ success: true, todo: temp });
});

// router.route("/deleteAll").delete((req, res) => {
//     Todo.deleteOne({ _id: "ObjectId(60c1161a4b0f082b70e225f3)" })

// })

router.route("/delete/:id").delete((req, response) => {
  const id = req.params.id;

  Todo.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      response.json({ success: true });
      console.log("success fully deleted item");
    } else {
      response.json({ success: false });

      console.log("error occured while deleting todo , ", err);
    }
  });
});

router.route("/deleteall").delete(async (req, res) => {
  await Todo.remove({}, (req, response, err) => {
    if (!err) {
      res.json({ success: true });
      console.log("success fully deleted all");
    } else {
      res.json({ success: false });

      console.log("error occured while deleting all todo , ", err);
    }
  });
});

router.route("/put/:id").put((req, res) => {
  const title = req.body.title;
  const id = req.params.id;

  Todo.findByIdAndUpdate(
    { _id: id },
    { $set: { title: title } },
    (req, response, err) => {
      if (!err) {
        res.json({ success: true });
        console.log("success fully updated Todo");
      } else {
        res.json({ success: false });

        console.log("error occured while updating todo , ", err);
      }
    }
  );
});

router.route("/todos").get(async (req, res) => {
  console.log('res json back',res)

  return await Todo.find().then((todo) => {
    return res.json(todo);
  });
});

module.exports = router;

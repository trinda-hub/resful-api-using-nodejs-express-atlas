module.exports = app => {
    //definisikan controller yang bertanggung jawab
    const sharebuttons = require
    ("../controllers/sharebutton.controller.js");

    var router = require("express").Router();

    //create a new ShareButton
    router.post("/", sharebuttons.create);

    //Retrieve all Categories
    router.get("/", sharebuttons.findAll);

    // Retrieve a single Category with id
    router.get("/:id", sharebuttons.findOne);

    //Update a Category with id
    router.put("/:id", sharebuttons.update);

    //Delete a Category with id
    router.delete("/:id", sharebuttons.delete);

    //
    app.use("/api/sharebuttons", router);
};
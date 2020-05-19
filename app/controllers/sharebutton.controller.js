//pilih model yang dipakai

const db = require("../models");
const Sharebutton = db.sharebuttons;

//create and save a new Sharebutton

exports.create = (req, res) => {
    //validate request
    if (!req.body.name) {
        res.status(400).send({ message: "tidak boleh kosong!"});
        return;
    }

    // create a Sharebutton
    const sharebutton = new Sharebutton({
        image_url:req.body.image_url,
        redirect_url:req.body.redirect_url,
        name:req.body.name,
        slug:req.body.slug
        
    });

    //save Sharebutton in the database
    sharebutton
         //
        .save(sharebutton)
        //kalau berhasil save
        .then(data =>{
            res.send(data);
        })
        //kalau tidak berhasil save
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Sharebutton."
            
            });
        });
};

//
// Retrieve all from the database.
exports.findAll = (req, res) => {

    //definisikan parameter pencarian
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    //versi mongoose dari db.sharebutton.find({condition})
    Sharebutton.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sharebuttons."
        });
      });
  };
  
  // Find a single Sharebutton with an id
  exports.findOne = (req, res) => {
    //cari parameter
    const id = req.params.id;
  
    Sharebutton.findById(id)
      .then(data => {
        //kasus data tidak ketemu
        if (!data)
          res.status(404).send({ message: "Not found Sharebutton with id " + id });
        //kasus data ketemu
        else res.send(data);
      })
      //handling ketika ada error
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Sharebutton with id=" + id });
      });
  };
  
  // Update a Sharebutton by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Sharebutton.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Sharebutton with id=${id}. Maybe Sharebutton was not found!`
          });
        } else res.send({ message: "Sharebutton was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Sharebutton with id=" + id
        });
      });
  };
  
  // Delete a Sharebutton with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Sharebutton.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Sharebutton with id=${id}. Maybe Sharebutton was not found!`
          });
        } else {
          res.send({
            message: "Shharebutton was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Sharebutton with id=" + id
        });
      });
  };
  
 
//export model supaya bisa dipakai file lain
module.exports = mongoose => {
    //definisi schema, termasuk validasi
    var schema = mongoose.Schema({
        image_url: String,
        redirect_url: String,
        name: String,
        slug: {
          type: String,
          lowercase: true
        } 
      },
      { timestamps: true }
    );
    
  
    //fungsi mejik. jangan disentuh bro!!!
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    //schema dibangun sebagai model Sharebutton, mengacu pada collection "sharebutton"
    const Sharebutton = mongoose.model("sharebutton", schema);
    return Sharebutton;
  };
  
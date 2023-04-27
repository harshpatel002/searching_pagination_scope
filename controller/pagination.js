const users = require("../models").User;

const pages = async (req, res) => {
  try {
    let ajax = req.query.ajax || "false";
    let page = req.query.page || 1;
    let limit = 5;
    let offset = (page - 1) * limit || 0;

    let allrecords1 = await users.count();
    let allrecords = Math.ceil(allrecords1 / limit);
    console.log("@@@@@@@@@@@@@@@@@@@@@", allrecords);

    // console.log('******************',offset);
    // console.log('******************',page);
    users.addScope(
      "pagination",
      {
        offset,
        limit,
        order: [["id", "asc"]],
      },
      { override: true }
    );

    let data = await users.scope("pagination").findAll();
    console.log(data);
    // let data = await users.findAll({
    //   offset,
    //   limit,
    //   order: [["id", "asc"]],
    // });

    // res.json(data);

    if (ajax == "false") {
      res.render("index.ejs", { data, page, allrecords });
    } else {
      res.send(data, page, allrecords);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { pages };

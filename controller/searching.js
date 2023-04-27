const users = require("../models").User;

const { Op } = require("sequelize");

const search = async (req, res) => {
  try {
    let search = req.query.search || 0;
    let firstName = "";
    let lastName = "";
    let email = "";

    for (i = 0; i < search.length; i++) {
      if (search.charAt(i) == "^") {
        for (j = i + 1; j <= search.length; j++) {
          if (search.charAt(j) == "%" || search.charAt(j) == "$") {
            break;
          } else {
            firstName += search.charAt(j);
            console.log("----------------------------", firstName);
          }
        }
      } else if (search.charAt(i) == "%") {
        for (j = i + 1; j <= search.length; j++) {
          if (search.charAt(j) == "^" || search.charAt(j) == "$") {
            break;
          } else {
            lastName += search.charAt(j);
          }
        }
      } else if (search.charAt(i) == "$") {
        for (j = i + 1; j <= search.length; j++) {
          if (search.charAt(j) == "^" || search.charAt(j) == "%") {
            break;
          } else {
            email += search.charAt(j);
          }
        }
      }
    }

    console.log("***********************", firstName);

    users.addScope(
      "searching",
      {
        where: {
          [Op.and]: [
            {
              firstName: {
                [Op.like]: `%${firstName}`,
              },
            },
            {
              lastName: {
                [Op.like]: `%${lastName}`,
              },
            },
            {
              email: {
                [Op.like]: `%${email}`,
              },
            },
          ],
        },
      },
      {
        override: true,
      }
    );

    let data1 = await users.scope("searching").findAll();
    // res.json(data);
    console.log("//////////////////////", data1);
    res.render("searching.ejs", { data1, search });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { search };

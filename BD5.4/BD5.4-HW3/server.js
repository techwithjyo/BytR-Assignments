const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib/index");
const Chef = require("./models/chef.model");
const Dish = require("./models/dish.model");
const ChefDish = require("./models/chefDish.model");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyDishes = [
  { name: "Margherita Pizza", cuisine: "Italian", preparationTime: 20 },
  { name: "Sushi", cuisine: "Japanese", preparationTime: 50 },
  { name: "Poutine", cuisine: "Canadian", preparationTime: 30 },
];

const dummyChefs = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Dish.bulkCreate(dummyDishes);
    await Chef.bulkCreate(dummyChefs);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.post("/chefs/new", async (req, res) => {
  const newChef = req.body.newChef;
  if (!newChef) {
    return res
      .status(400)
      .json({ error: "newChef is required in the request body" });
  }
  try {
    const chef = await Chef.create(newChef);
    res.status(201).json({ newChef: chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/chefs/update/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newChefData = req.body;
  try {
    await Chef.update(newChefData, { where: { id } });
    const updatedChef = await Chef.findByPk(id);
    res.status(200).json({
      message: "Chef updated successfully",
      updatedChef: updatedChef,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

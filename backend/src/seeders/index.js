import seedUsers from "./user.seed.js";
import seedVehicles from "./vehicle.seed.js";


const runSeeder = async()=>{

    await seedUsers();

    await seedVehicles();


    console.log("Database seeding completed");


    process.exit();

};


runSeeder();
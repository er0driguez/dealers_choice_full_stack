const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');

const Diver = sequelize.define('diver', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    certificationLevel: {
        type: Sequelize.ENUM("Open Water", "Advanced Open Water", "Divemaster"),
        defaultValue: "Open Water"
    }
});

const DiveSite = sequelize.define('diveSite', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    diverTypeAllowed: {
        type: Sequelize.ENUM("Open Water", "Advanced Open Water", "Divemaster")
    },
    description: {
        type: Sequelize.TEXT
    }
});

Diver.generateRandom = function() {
    return this.create({ name: `New Diver ${Math.floor(Math.random() * 99)}` })
};

const syncAndSeed = async() => {
    await sequelize.sync({ force: true });

    const [ paradise, chankanaab, santaRosa, thistlegorm, daedalus, tubbataha, galera ] = await Promise.all([
        DiveSite.create({ name: "Paradise Reef", location: "Cozumel, Mexico", diverTypeAllowed: "Open Water", description: "With great visibility and soft currents, this reef is often used in open water certification dives. A great Cozumel diving location to practice your buoyancy skills and see some beautiful sea-life." }),
        DiveSite.create({ name: "Chankanaab Reef", location: "Cozumel, Mexico", diverTypeAllowed: "Open Water", description: "This reef is located in front of Chankanaab Park and is one of the best dive sites in Cozumel for beginners due to the mild currents and shallow depths. You will be able to experience loads of colorful coral, the Cozumel Toadfish, rays, lobster and a plethora of vibrant fish species." }),
        DiveSite.create({ name: "Santa Rosa Wall", location: "Cozumel, Mexico", diverTypeAllowed: "Advanced Open Water", description: "Santa Rosa Wall is one of the most popular deep dive sites. The spectacular wall begins at around 20 meters and quickly drops deeper into the blue. It is easy to understand why the Santa Rosa Wall is so famous. With endless delights on offer like enormous sponges, caves, overhangs, swim-through tunnels, colorful fans, and beds of tunicates, you may never want to surface. You’ll be captivated by the large sea life here as well. Massive sea turtles, eagle rays, grouper, and sharks have been regularly seen. This dive site is an intermediate level site as the currents can be strong." }),
        DiveSite.create({ name: "S.S. Thistlegorm Wreck", location: "Red Sea, Egypt", diverTypeAllowed: "Open Water", description: "The Thistlegorm is a World War II shipwreck located in the North of the Red Sea in the Strait of Gubal. A former 128-meter long British transport ship and sunk in 1941 after being hit by a German air attack. The shipwreck is in very good condition, and you are able to dive amongst WWII relics as the deck cargo remained underwater all those years." }),
        DiveSite.create({ name: "Daedalus Reef", location: "Red Sea, Egypt", diverTypeAllowed: "Advanced Open Water", description: "Daedalus is a remote outpost of a reef, less than a kilometre wide and marked by a lighthouse, some 80 km offshore from Marsa Alam. Its isolation means it is only visited by liveaboard and this, together with its marine park status, means its reefs are in top condition and it's one of the best loved scuba dives in the Red Sea." }),
        DiveSite.create({ name: "Tubbataha Reef", location: "Palawan, Philippines", diverTypeAllowed: "Open Water", description: "One of the most remote diving destinations in the Philippines, Tubbataha Reefs Natural Park is only reachable by liveaboard between March and June. It is a UNESCO World Heritage Site and boasts 600 species of fish, 360 species of coral, 13 whale and dolphin species, and 11 species of shark." }),
        DiveSite.create({ name: "Canyons Puerto Galera", location: "Puerto Galera, Philippines", diverTypeAllowed: "Advanced Open Water", description: "While there are several dive sites worth note, the most sought after is Canyons. Here, currents sweep divers through three gorgeous canyons covered in a variety of soft corals and sponges. Take your time inside these structures to find large schools of fish including barracudas, batfish, snappers, emperors and trevally." })
    ]);

    await Promise.all([
        Diver.create({ name: "Evelyn", certificationLevel: "Open Water" }),
        Diver.create({ name: "Jimmy", certificationLevel: "Advanced Open Water" }),
        Diver.create({ name: "Mike", certificationLevel: "Advanced Open Water" }),
        Diver.create({ name: "Kara", certificationLevel: "Open Water" }),
        Diver.create({ name: "Jose", certificationLevel: "Divemaster" }),
        Diver.create({ name: "Luisa", certificationLevel: "Divemaster" })
    ]);
};

module.exports = {
    sequelize,
    Diver,
    DiveSite,
    syncAndSeed
};
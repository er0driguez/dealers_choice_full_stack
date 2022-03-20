const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_full_stack');

const Diver = sequelize.define('diver', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    certificationLevel: {
        type: Sequelize.ENUM("Open Water", "Advanced Open Water", "Rescue", "Divemaster"),
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
    }
});

Diver.generateRandom = function() {
    return this.create({ name: `New Diver ${Math.floor(Math.random() * 99)}` })
};

const syncAndSeed = async() => {
    await sequelize.sync({ force: true });

    const [ paradise, chankanaab, santaRosa, thistlegorm, daedalus, tubbataha, galera ] = await Promise.all([
        DiveSite.create({ name: "Paradise Reef", location: "Cozumel, Mexico", diverTypeAllowed: "Open Water" }),
        DiveSite.create({ name: "Chankanaab Reef", location: "Cozumel, Mexico", diverTypeAllowed: "Open Water" }),
        DiveSite.create({ name: "Santa Rosa Wall", location: "Cozumel, Mexico", diverTypeAllowed: "Advanced Open Water" }),
        DiveSite.create({ name: "U.S.S. Thistlegorm Wreck", location: "Red Sea, Egypt", diverTypeAllowed: "Open Water" }),
        DiveSite.create({ name: "Daedalus Reef", location: "Red Sea, Egypt", diverTypeAllowed: "Advanced Open Water" }),
        DiveSite.create({ name: "Tubbataha Reef", location: "Palawan, Philippines", diverTypeAllowed: "Open Water" }),
        DiveSite.create({ name: "Canyons Puerto Galera", location: "Puerto Galera, Philippines", diverTypeAllowed: "Advanced Open Water" })
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
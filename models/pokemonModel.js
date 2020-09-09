(mongoose) => {
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    hp: {
        type: String,
        required: true,
    },
    attack: {
        type: String,
        required: true,
    },
    defense: {
        type: String,
        required: true,
    },
    speed: {
        type: String,
        required: true,
    },
    active: {
        type: String,
        required: true,
    },
});

const pokemonModel = mongoose.model('pokemon',schema, 'pokemon');
return pokemonModel;
};
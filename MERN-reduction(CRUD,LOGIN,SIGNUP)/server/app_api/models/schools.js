const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    elect_eur: {
        type: Number,
        required: true
    },
    elect_kwh: {
        type: Number,
        required: true
    },
    heating_eur: {
        type: Number,
        required: true
    },
    heating_kwh: {
        type: Number,
        requried: true
    },
    water_eur: {
        type: Number,
        required: true
    },
    water_litres: {
        type: Number,
        required: true
    }
});

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    statistics:[statisticSchema] 
});

mongoose.model('School', schoolSchema);
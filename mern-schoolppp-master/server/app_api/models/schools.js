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
    elecEuro: {
        type: Number,
        required: true
    },
    elecKwh: {
        type: Number,
        required: true
    },
    heatEuro: {
        type: Number,
        required: true
    },
    heatKwh: {
        type: Number,
        requried: true
    },
    waterEuro: {
        type: Number,
        required: true
    },
    waterLiter: {
        type: Number,
        required: true
    }
});

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    schoolData:[statisticSchema] 
});

mongoose.model('School', schoolSchema);
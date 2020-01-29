const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {type: String, required: true},
    paternalLastName: {type: String, required: true},
    maternalLastName: {type: String},
    cedula: {type: String, required: true},
    specialty: {type: String},
    email: {type: String, match: /[\w\.-]+@[\w\.-]+\.[\w\.]+/, required: true},
    password: {type: String, required: true},
    location: [{type: Schema.Types.ObjectId, ref: 'Location'}],
    appointment: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
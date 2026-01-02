import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    requiredSkills: [String],
    applyUrl: String
});

export default mongoose.model('Job', JobSchema);
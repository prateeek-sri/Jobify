import mongoose from 'mongoose';

const CandidateProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
    skills: [String],
    experience: [{
        role: String,
        company: String,
        years: String
    }],
    projects: [String]
});

export default mongoose.model('CandidateProfile', CandidateProfileSchema);
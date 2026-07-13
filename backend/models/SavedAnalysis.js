import mongoose from 'mongoose';

const SavedAnalysisSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['RESUME', 'ATS_MATCH'], required: true },
    atsScore: { type: Number },
    matchScore: { type: Number },
    missingSkills: [String],
    missingKeywords: [String],
    improvements: [String],
    suggestedImprovements: [{
      area: String,
      suggestion: String
    }],
    verdict: String,
    resumeSummary: String,
    summary: String,
    jobTitle: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('SavedAnalysis', SavedAnalysisSchema);

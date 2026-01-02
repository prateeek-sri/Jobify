import model from '../config/gemini.js';
import CandidateProfile from '../models/CandidateProfile.js';

const USER_ID = "65df7b123456789012345678"; 

export const analyzeMatch = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const profile = await CandidateProfile.findOne({ userId: USER_ID });

        if (!profile) return res.status(404).json({ msg: 'Profile not found' });

        const prompt = `
        Compare the following Candidate Profile with the Job Description.
        
        Candidate Skills: ${profile.skills.join(', ')}
        Candidate Experience: ${JSON.stringify(profile.experience)}
        
        Job Description:
        ${jobDescription}

        Output strict JSON:
        {
            "matchScore": (integer 0-100),
            "missingSkills": ["Skill 1", "Skill 2"],
            "explanation": "One sentence summary of fit."
        }
        `;

        const result = await model.generateContent(prompt);
        const cleanedJson = result.response.text().replace(/```json/g, '').replace(/```/g, '');
        const analysis = JSON.parse(cleanedJson);

        res.json(analysis);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
import parsePDF from '../utils/pdfParser.js';
import model from '../config/gemini.js';
import CandidateProfile from '../models/CandidateProfile.js';
import fs from 'fs';

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

        const text = await parsePDF(req.file.path);

        const prompt = `
        Extract the following details from this resume text as a strict JSON object:
        {
            "name": "Full Name",
            "email": "Email Address",
            "skills": ["Array", "of", "Skills"],
            "experience": [{"role": "Job Title", "company": "Company Name", "years": "Duration"}],
            "projects": ["Project Title 1", "Project Title 2"]
        }
        Do not add markdown formatting like \`\`\`json. Just raw JSON.
        
        Resume Text:
        ${text.substring(0, 5000)}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '');
        const profileData = JSON.parse(cleanedJson);

        const userId = "65df7b123456789012345678"; 

        let profile = await CandidateProfile.findOne({ userId });
        if (profile) {
            profile = await CandidateProfile.findOneAndUpdate({ userId }, profileData, { new: true });
        } else {
            profile = await CandidateProfile.create({ userId, ...profileData });
        }

        fs.unlinkSync(req.file.path);

        res.json({ success: true, profile });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
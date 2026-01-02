import Job from '../models/Job.js';
import Application from '../models/Application.js';
import CandidateProfile from '../models/CandidateProfile.js';

const USER_ID = "65df7b123456789012345678"; 

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().limit(10);
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

export const seedJobs = async (req, res) => {
    try {
        await Job.create({
            title: "Frontend Developer",
            company: "TechCorp",
            description: "React, Node.js, Mongo needed.",
            requiredSkills: ["React", "Node.js"],
            applyUrl: "https://techcorp.com/apply"
        });
        res.json({ msg: "Job seeded" });
    } catch (err) {
        res.status(500).send('Error seeding');
    }
};

export const swipeRight = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        const profile = await CandidateProfile.findOne({ userId: USER_ID });
        
        const applicationPayload = {
            fullName: profile.name,
            email: profile.email,
            coverLetter: `I am interested in this role at your company. I have experience in ${profile.skills[0]}.`
        };

        const app = await Application.create({
            userId: USER_ID,
            jobId,
            status: 'READY',
            applicationPayload
        });

        res.json({ success: true, applicationId: app._id });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const getApplication = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id);
        const job = await Job.findById(app.jobId);

        if (!app) return res.status(404).json({ msg: 'Application not found' });

        res.json({
            application: app,
            applyUrl: job.applyUrl
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

export const getHistory = async (req, res) => {
    try {
        const USER_ID = "65df7b123456789012345678"; 
        const apps = await Application.find({ userId: USER_ID }).populate('jobId', 'title company');
        res.json(apps);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
import CandidateProfile from '../models/CandidateProfile.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const sendTokenResponse = async (user, res) => {
    const token = jwt.sign(
        { userId: user._id.toString() },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '30d' }
    );
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProd,                
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });

    let avatarToSend = user.avatar;
    let skillsToSend = user.skills || [];
    try{
        const candidateProfile = await CandidateProfile.findOne({ userId: user._id });
        if(candidateProfile && candidateProfile.avatar){
            avatarToSend = candidateProfile.avatar;
        }   
    } catch(err){
        res.status(500).json({msg: "Server error"});
        return;
    }

    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: avatarToSend,
            skills: skillsToSend
        }
    });
};


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatars = [
            '/avatars/icecream.png',
            '/avatars/vampire.png',
            '/avatars/mask.png',
            '/avatars/toast.png',
            '/avatars/brush.png'
        ];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: randomAvatar
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please login.'
        });

    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        sendTokenResponse(user, res);

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export const logout = (req, res) => {
    const isProd = process.env.NODE_ENV === 'production';

    res.clearCookie('token', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax'
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};


export const getMe = async (req, res) => {
    try {
        const userId = req.userId || req.user?.id;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        let avatarToSend = user.avatar;
        try {
            const candidateProfile = await CandidateProfile.findOne({ userId });
            if (candidateProfile && candidateProfile.avatar) {
                avatarToSend = candidateProfile.avatar;
            }
        } catch (e) {}

        const userData = {
            ...user.toObject(),
            avatar: avatarToSend
        };

        res.status(200).json({
            success: true,
            user: userData
        });

    } catch (err) {
        console.error('GetMe Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

export const googleLogin = async (req, res) => {
  try {
    console.log("GOOGLE LOGIN BODY:", req.body);
    const { token, access_token } = req.body;
    let email, name, picture;

    if (token) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
    } else if (access_token) {
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const userInfo = await userInfoRes.json();
      if (!userInfo || !userInfo.email) {
        return res.status(400).json({ success: false, msg: "Failed to fetch Google profile" });
      }
      email = userInfo.email;
      name = userInfo.name;
      picture = userInfo.picture;
    } else {
      return res.status(400).json({ success: false, msg: "Token missing" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        password: "GOOGLE_OAUTH", 
      });
    }

    sendTokenResponse(user, res);
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ success: false, msg: "Google login failed" });
  }
};

export const githubLogin = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, msg: "Code missing" });

    // 1. Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ success: false, msg: "GitHub token exchange failed" });
    }

    const accessToken = tokenData.access_token;

    // 2. Get User Info
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    if (!userData || !userData.id) {
      return res.status(400).json({ success: false, msg: "Failed to fetch GitHub profile" });
    }

    // 3. Get User Emails (since email might be private)
    let email = userData.email;
    if (!email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const emailsData = await emailResponse.json();
      const primaryEmail = emailsData.find(e => e.primary);
      email = primaryEmail ? primaryEmail.email : null;
    }

    if (!email) {
      return res.status(400).json({ success: false, msg: "No email associated with GitHub account" });
    }

    // 4. Find or Create User
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: userData.name || userData.login,
        email,
        avatar: userData.avatar_url,
        password: "GITHUB_OAUTH", 
      });
    }

    sendTokenResponse(user, res);
  } catch (err) {
    console.error("GitHub login error:", err);
    res.status(500).json({ success: false, msg: "GitHub login failed" });
  }
};

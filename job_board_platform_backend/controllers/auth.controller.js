import Employer from '../models/employer.model.js';
import JobSeeker from '../models/jobSeeker.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId, role)=>{
    return jwt.sign ({userId,role}, process.env.JWT_SECRET, {expiresIn: '30d'});
}


const registerEmployer = async (req, res) => {
    try {
        const {companyName, email, password} = req.body;
        const existingEmployer = await Employer.findOne({email});
        if (existingEmployer){
            res.send({message: 'Employer already exists', success: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployer = new Employer({
            companyName,
            email,
            password:hashedPassword
        })
        await newEmployer.save();
        const token = generateToken(newEmployer._id, newEmployer.role);
        res.send({message: 'Employer registered successfully', success: true, token});
    } catch (error) {
        res.status(500).send({message: 'Server error', success: false});
    }
    
}

const registerJobSeeker = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const existingJobSeeker = await JobSeeker.findOne({email});
        if (existingJobSeeker){
            res.send({message: 'Job Seeker already exists', success: false});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newJobSeeker = new JobSeeker({
            fullName,
            email,
            password: hashedPassword
        });
        await newJobSeeker.save();
        const token = generateToken(newJobSeeker._id, newJobSeeker.role);
        res.send({message: 'Job Seeker registered successfully', success: true, token});
    } catch (error) {
        res.status(500).send({message: 'Server error', success: false});
    }
    
}

const loginUser = async (req, res) => {
    const {email, password, role} = req.body;
    try {
        const Model = role === 'employer' ? Employer : JobSeeker;
        const user = await Model.findOne({email});
        if (!user) {
            return res.status(404).send({message: 'User not found', success: false});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({message: 'Invalid credentials', success: false});
        }
        const token = generateToken(user._id, user.role);   
        res.send({message: 'Login successful', success: true, token});     

    } catch (error) {
        res.status(500).send({message: 'Server error', success: false});
    }
}

const getallUsers = async (req, res) => {
    try {
        const employers = await Employer.find();
        const jobSeekers = await JobSeeker.find();
        res.send({employers, jobSeekers, success: true});
    } catch (error) {
        res.status(500).send({message: 'Server error', success: false});
    }
}

export {registerEmployer, registerJobSeeker, loginUser, getallUsers};
import express from 'express'
import { Router } from 'express';
import { getAllApplications, updateApplicationStatus, createApplication } from '../controllers/applicationController.js';

const router = Router();

router.get('/applications', getAllApplications);
router.post('/applications', createApplication);
router.patch('/applications/:id', updateApplicationStatus);

export default router;

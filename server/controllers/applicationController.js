import Application from '../models/Application.js';

// Controller functions
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error app controller get' });
  }
};

export const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      // Handle validation error
      return res.status(400).json({ error: error.message });
    }
    // Handle other errors
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal server error app controller create' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Internal server error app controller update' });
  }
};




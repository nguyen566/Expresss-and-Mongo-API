const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
import { Response, Request } from 'express';
import { createProject, deleteProjectById, getProjectById, getProjects, updateProjectById } from '../services/projectServices';

//@desc Get all Projects
//@route GET /api/projects
//@access Public
const getProjectsHandler = asyncHandler(async (req: Request, res: Response) => {
    const projects = await getProjects();
    res.status(200).json(projects)
});

//@desc Create a new Project
//@route POST /api/projects
//@access Private
const createProjectHandler = asyncHandler(async (req: Request, res: Response) => {
    const project = await createProject(req.body);
    res.status(201).json(project)
});

//@desc Get a project by id
//@route GET /api/projects/:id
//@access Public
const getProjectHandler = asyncHandler(async (req: Request, res: Response) => {
    const project = await getProjectById(req.params.id);
    res.status(200).json(project)
});

//@desc Update a project by id
//@route Update /api/projects/:id
//@access Private
const updateProjectHandler = asyncHandler(async (req: Request, res: Response) => {
    const project = await updateProjectById(req.params.id, req.body);
    res.json({
        message: `Update Project At ${req.params.id}`,
        project: project
    })
});

//@desc Delete a project by id
//@route DELETE /api/projects/:id
//@access Private
const deleteProjectHandler = asyncHandler(async (req: Request, res: Response) => {
    const project = await deleteProjectById(req.params.id);
    res.status(200).json({ message: `Project ${req.params.id} deleted`, project: project });
});

module.exports = {
    getProjectsHandler,
    createProjectHandler,
    getProjectHandler,
    updateProjectHandler,
    deleteProjectHandler
};
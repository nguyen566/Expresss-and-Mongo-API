import { validateObjectId } from '../database/db';
import ProjectModel from '../models/projectModel';
import { sanitizeProject } from '../sanitizers/projectSanitizer';
import { IProjectScehma } from '../schema/proejctSchema';
import { ProjectType } from '../types/projectTypes';

export async function getProjects(): Promise<ProjectType[]> {
    try {
        const projects = await ProjectModel.find();
        if(!projects){
            throw new Error('No Projects Found');
        }
        return projects;
    } catch (error) {
        throw new Error('Projects not found');
    }
}

export async function createProject(project: ProjectType): Promise<ProjectType>{
    const sanitizedProject = sanitizeProject(project);
    try {
        const newProject = await ProjectModel.create(sanitizedProject);
        if(!newProject) throw new Error('Error with creating a project');

        return newProject;
    } catch (error) {
        throw new Error('Issues with creating method');
    }
}

export async function getProjectById(id: string): Promise<IProjectScehma>{
    validateObjectId(id);
    try{
        const project = await ProjectModel.findById(id);
        if(!project) throw new Error(`Cannot find project with Id: ${id}`);

        return project
    }catch(err){
        throw new Error(`Cannot initiate finding ProjectById`)
    }
}

export async function updateProjectById(id: string, project: ProjectType): Promise<IProjectScehma>{
    validateObjectId(id);

    const sanitizedProject = sanitizeProject(project);

    try {
        const updateProject = await ProjectModel.findByIdAndUpdate(id, sanitizedProject, {
            new: true
        })
        if(!updateProject) throw new Error(`Error updating project with Id: ${id}`);

        return updateProject;
    } catch (error) {
        throw new Error('Cannot update project');
    }
}

export async function deleteProjectById(id: string): Promise<void>{
    validateObjectId(id);
    
    try {   
        const deleteProject = await ProjectModel.findByIdAndDelete(id);
        if(!deleteProject) throw new Error(`Issues deleting project with Id: ${id}`);

        return;
    } catch (error) {
        throw new Error('Cannot initate delete');
    }
}




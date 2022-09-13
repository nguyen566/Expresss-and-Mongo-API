import { ProjectType } from "../types/projectTypes";
import HttpException from "../utils/httpExpcetion";

export function sanitizeProject(project: ProjectType): ProjectType{
    let sanitizedProject = <ProjectType>{};

    sanitizedProject.title = sanitizeTitle(project.title);

    return sanitizedProject;
}

const sanitizeTitle = (title: string) => {
    if(title === undefined) throw new HttpException('Title is not defined', 400);
    if(typeof title !== 'string') throw new HttpException('Title is not a string', 400);

    title = title.trim();
    
    if(title.length < 3) throw new HttpException('Title must have at least 3 characters', 400);
    if(title.length > 50) throw new HttpException('Title must be less than 50 characters', 400);

    return title;
}
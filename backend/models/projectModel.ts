import { model } from "mongoose";
import projectSchema, { IProjectScehma } from "../schema/proejctSchema";

const ProjectModel = model<IProjectScehma>("Project", projectSchema);

export default ProjectModel;
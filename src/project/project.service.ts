import { forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Project} from "./project.model";
import {CreateProjectDto} from "./dto/create-project.dto";
import {RequestService} from "../request/request.service";
import {UnbindRequestsDtoDto} from "./dto/unbind-requests.dto";
import {GetProjectRequestsDto} from "./dto/get-project-requests.dto";
import {UpdateProjectDto} from "./dto/update-project.dto";



@Injectable()

export class ProjectService {

    constructor(
        @InjectModel(Project) private projectRep: typeof Project,
        @Inject(forwardRef(() => RequestService))
        private requestService: RequestService
    ) {
    }

    async createProject(dto: CreateProjectDto) {
        const project = await this.projectRep.create(dto);
        await project.$set('requests', [])
        return project
    }

    async getAllProjects() {
        const projects = await this.projectRep.findAll({include: {all: true, nested: true}})
        return projects
    }

    async getProjectById(id: number) {
        const request = await this.projectRep.findOne({where: {id}, include: {all: true, nested: true}})
        return request
    }

    async bindRequests(projectID, requestId) {
        const project = await this.projectRep.findByPk(projectID);
        const requestID = await this.requestService.getRequestById(requestId);

        if (project && requestID) {
            await project.$add('requests', requestID)

            return requestID
        }
        throw new HttpException('Ошибка', HttpStatus.NOT_FOUND)
    }

    async unBindRequest(dto: UnbindRequestsDtoDto) {
        const project = await this.projectRep.findByPk(dto.projectId);
        const requestID = await this.requestService.getRequestById(dto.requestId);

        if (project && requestID) {
            await project.$remove('requests', requestID)

            return dto;
        }
        throw new HttpException('Ошибка', HttpStatus.NOT_FOUND)
    }

    async getProjectRequests(dto: GetProjectRequestsDto) {
        const reqs = await this.requestService.getAllRequests(dto.projectId)
        return reqs
    }

    async updateProject(dto: UpdateProjectDto) {
        const project = await this.getProjectById(dto.projectId);
        dto.title !== project.title ? await project.update({'title': dto.title}) : '';

        return dto
    }

    async deleteProject(dto: GetProjectRequestsDto) {
        const project = await this.getProjectById(dto.projectId);
        await project.destroy({force: true})

        return project
    }


}

import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {UnbindRequestsDtoDto} from "./dto/unbind-requests.dto";
import {GetProjectRequestsDto} from "./dto/get-project-requests.dto";
import {UpdateProjectDto} from "./dto/update-project.dto";
import {BindDto} from "../request/dto/bind.dto";

@Controller('project')
export class ProjectController {
    constructor(private ProjectService: ProjectService) {
    }

    @Post()
    create(@Body() projectDto: CreateProjectDto) {
        return this.ProjectService.createProject(projectDto);
    }

    @Get()
    getAll() {
        return this.ProjectService.getAllProjects();
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.ProjectService.getProjectById(id)
    }

    @Post('/bind')
    bind(@Body() dto: BindDto) {
        return this.ProjectService.bindRequests(dto.projectID, dto.requestID)
    }

    @Post('/unbind')
    unBind(@Body() dto: UnbindRequestsDtoDto) {
        return this.ProjectService.unBindRequest(dto)
    }
    @Get('/:id/req')
    getRequests(@Body() dto: GetProjectRequestsDto) {
        return this.ProjectService.getProjectRequests(dto)
    }

    @Patch()
    updateProject(@Body() dto: UpdateProjectDto){
        return this.ProjectService.updateProject(dto)
    }

    @Delete()
    deleteProject(@Body() dto: UpdateProjectDto) {
        return this.ProjectService.deleteProject(dto)
    }
}

import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {RequestService} from "../request/request.service";
import {AddRequestsDto} from "./dto/add-requests.dto";
import {UnbindRequestsDtoDto} from "./dto/unbind-requests.dto";
import {GetProjectRequestsDto} from "./dto/get-project-requests.dto";
import {UpdateProjectDto} from "./dto/update-project.dto";

@Controller('project')
export class ProjectController {
    constructor(private ProjectService: ProjectService, private reqServ: RequestService) {
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
    bind(@Body() dto: AddRequestsDto) {
        return this.ProjectService.bindRequests(dto)
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

import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {RequestService} from "./request.service";
import {CreateRequestDto} from "./dto/create-request.dto";
import {UpdateRequestDto} from "./dto/update-request.dto";
import {DeleteRequestDto} from "./dto/delete-request.dto";
import {StatusSwitchDto} from "../status/dto/status-switch.dto";

@Controller('requests')
export class RequestController {
    constructor(private requestService: RequestService) {}


    @Post()
    create(@Body() requestDto: CreateRequestDto) {
        return this.requestService.createRequest(requestDto);
    }

    @Get()
    getAll() {
        return this.requestService.getAllUnexpectedRequests();
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.requestService.getRequestById(id)
    }
    @Patch()
    updateRequest(@Body() dto: UpdateRequestDto){
        return this.requestService.updateRequest(dto)
    }

    @Delete()
    deleteRequest(@Body() dto: DeleteRequestDto) {
        return this.requestService.deleteRequest(dto.requestId)
    }

    @Post('/:id/status/next')
    nextStatus(@Body() dto: StatusSwitchDto) {
        return this.requestService.nextStatus(dto)
    }

    @Post('/:id/status/prev')
    prevStatus(@Body() dto: StatusSwitchDto) {
        return this.requestService.prevStatus(dto)
    }
}

import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RequestItem} from "./request.model";
import {CreateRequestDto} from "./dto/create-request.dto";
import {UpdateRequestDto} from "./dto/update-request.dto";
import { StateService } from 'src/status/state.service';
import {StatusSwitchDto} from "../status/dto/status-switch.dto";
import {ProjectService} from "../project/project.service";
import {DeleteRequestDto} from "./dto/delete-request.dto";







@Injectable()

export class RequestService {
    constructor(

        @InjectModel(RequestItem) private requestRep: typeof RequestItem,
                private stateRep: StateService,
        @Inject(forwardRef(()=> ProjectService))
        private projectService: ProjectService
    ) {}

    async createRequest(dto: CreateRequestDto) {
        const request = await  this.requestRep.create({title:dto.title, description: dto.description});
        const status = await this.stateRep.findStatusByValue('preform')
        await request.$set('currentStatus', status);
          if (dto.bind) {
              await this.projectService.bindRequests(dto.projectID, request.id)
              const newRequest = await this.requestRep.findOne({where: {id: request.id}, include:{all: true, nested: true}})
              return newRequest
          }
        const newRequest = await this.requestRep.findOne({where: {id: request.id}, include: {all:true, nested: true}})
       return newRequest
    }

    async getAllUnexpectedRequests () {

        const requests = await this.requestRep.findAll({where: {
            project_ID: null
            }, include: {all: true}});
        return requests
    }

    async getAllRequests (id: number) {
        const requests = await  this.requestRep.findAll({where: {
            project_ID: id
            }, include: {all: true}})
        return requests
    }

    async getRequestById (id: number) {
        const request = await this.requestRep.findOne({where: {id}, include: {all: true}})
        return request
    }

    async updateRequest(dto: UpdateRequestDto) {
        const request = await this.getRequestById(dto.requestId);
        dto.title !== request.title? await request.update({'title': dto.title}) : '';
        dto.description !== request.description? await request.update({'description': dto.description}) : ''
        return request
    }

    async deleteRequest(dto: DeleteRequestDto) {
        const request = await this.getRequestById(dto.requestId);
        await request.destroy();
        return request
    }
    async nextStatus(dto: StatusSwitchDto) {
        const request = await this.getRequestById(dto.request_ID);
        const status = await this.stateRep.findStatusByValue(request.currentStatus[0].cod);

        if (dto.value) {
            const newStatus = await this.stateRep.findStatusByValue(dto.value);
            await request.$set('currentStatus', newStatus);
            return request
        }
        if (status.cod === 'for_approval' && dto.complete) {
            const newStatus = await this.stateRep.findStatusByValue('accepted');
            await request.$set('currentStatus', newStatus);
            return request
        }

        if (status.cod === 'for_approval' && !dto.complete) {
            const newStatus = await this.stateRep.findStatusByValue('rejected');
            await request.$set('currentStatus', newStatus);
            return request
        }

        if (status.cod === 'rejected' || 'accepted' === status.cod) {
            throw new HttpException('Ошибка', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        else {
            const newStatus = await this.stateRep.findStatusById(status.id+1);
            await request.$set('currentStatus', newStatus);
            return request
        }


    }
    async prevStatus(dto: StatusSwitchDto) {
        const request = await this.getRequestById(dto.request_ID);
        const status = await this.stateRep.findStatusById(request.currentStatus[0].id);
        const prevStatus = await this.stateRep.findStatusById(request.currentStatus[0].id - 1)
        if (prevStatus.cod !== 'preform' && status.cod !== 'rejected' && status.cod !== 'accepted') {

            await request.$set('currentStatus', prevStatus);
            return request
        }
        else if (status.cod === 'rejected' || status.cod === 'accepted') {
            const newStatus = await this.stateRep.findStatusByValue('in_work');
            await request.$set('currentStatus', newStatus);
            return request
        }

        throw new HttpException('Ошибка', HttpStatus.UNPROCESSABLE_ENTITY)
    }
}

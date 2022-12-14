import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RequestItem} from "./request.model";
import {CreateRequestDto} from "./dto/create-request.dto";
import {UpdateRequestDto} from "./dto/update-request.dto";
import { StateService } from 'src/status/state.service';






@Injectable()

export class RequestService {
    constructor(@InjectModel(RequestItem) private requestRep: typeof RequestItem,
                private stateRep: StateService) {}

    async createRequest(dto: CreateRequestDto) {
        const request = await  this.requestRep.create(dto);
        const resId = request.id

        return request
    }

    async getAllUnexpectedRequests () {

        const requests = await this.requestRep.findAll({where: {
            project_ID: null
            }});
        return requests
    }

    async getAllRequests (id: number) {
        const requests = await  this.requestRep.findAll({where: {
            project_ID: id
            }})
        return requests
    }

    async getRequestById (id: number) {
        const request = await this.requestRep.findOne({where: {id}})
        return request
    }

    async updateRequest(dto: UpdateRequestDto) {
        const request = await this.getRequestById(dto.requestId);
        dto.title !== request.title? await request.update({'title': dto.title}) : '';
        dto.description !== request.description? await request.update({'description': dto.description}) : ''
        return dto
    }

    async deleteRequest(id: number) {
        const request = await this.getRequestById(id);
        await request.destroy();
        return request
    }
}

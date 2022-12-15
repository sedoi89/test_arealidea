import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { State } from './state.model';
import {StatusDto} from "./dto/status.dto";



@Injectable()
export class StateService {
    constructor(@InjectModel(State) private statusRep: typeof State) {}

    async setState(dto: StatusDto) {

        if(dto) {
            const state = await this.statusRep.create(dto)
            return state
        }
        const state = await this.statusRep.create()

        return state
    }

   async findStatusByValue(value: string) {
        const state = await this.statusRep.findOne({where: {cod: value}})
       return state
   }
    async findStatusById(id: number) {
        const state = await this.statusRep.findOne({where: {id: id}})
        return state
    }

}

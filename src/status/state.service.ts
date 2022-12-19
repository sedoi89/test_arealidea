import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { State } from './state.model';
import {StatusDto} from "./dto/status.dto";



@Injectable()
export class StateService {
    constructor(@InjectModel(State) private statusRep: typeof State) {}

    async setState(dto: StatusDto) {

        if(dto) {
            await this.statusRep.create({title: 'Заготовка', cod: 'preform'});
            await this.statusRep.create({title: 'В работе', cod: 'in_work'});
            await this.statusRep.create({title: 'На согласовании', cod: 'for_approval'});
            await this.statusRep.create({title: 'Отклонена', cod: 'accepted'});
            await this.statusRep.create({title: 'Принята', cod: 'rejected'});

            return dto
        }
        const state = await this.statusRep.create()

        return state
    }
    async fetchAll() {
        return await this.statusRep.findAll()
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

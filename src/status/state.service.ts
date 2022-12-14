import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { State } from './state.model';



@Injectable()
export class StateService {
    constructor(@InjectModel(State) private statusRep: typeof State) {}

    async setState() {
        const state = await this.statusRep.create()

        return state
    }

}

import { Module } from '@nestjs/common';
import {StateController} from "./state.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {StateService} from "./state.service";
import {State} from "./state.model";
import {RequestState} from "./request-states.model";



@Module({
    controllers: [StateController],
    providers: [StateService],
    imports: [
        SequelizeModule.forFeature([State,RequestState]),
    ],
    exports: [StateService]

})
export class StateModule {}

import {Module} from '@nestjs/common';
import {RequestController} from './request.controller';
import {RequestService} from './request.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {RequestItem} from "./request.model";
import {Project} from "../project/project.model";
import {StateModule} from "../status/state.module";
import {RequestState} from "../status/request-states.model";
import {ProjectModule} from "../project/project.module";




@Module({
    controllers: [RequestController],
    providers: [RequestService],
    imports: [
        SequelizeModule.forFeature([RequestItem,  Project, RequestState]),
StateModule, ProjectModule

    ],
    exports: [
        RequestService
    ]

})
export class RequestModule {
}

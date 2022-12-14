import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "./project.model";
import {RequestItem} from "../request/request.model";
import {RequestModule} from "../request/request.module";


@Module({

    controllers: [ProjectController],
    providers: [ProjectService],
    imports: [
        SequelizeModule.forFeature([Project, RequestItem]),
        RequestModule
    ],

})
export class ProjectModule {
}

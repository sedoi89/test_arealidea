import {forwardRef, Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "./project.model";
import {RequestModule} from "../request/request.module";



@Module({

    controllers: [ProjectController],
    providers: [ProjectService],
    imports: [
        SequelizeModule.forFeature([Project]),
       forwardRef(() => RequestModule)
    ],
exports: [ProjectService]
})
export class ProjectModule {
}

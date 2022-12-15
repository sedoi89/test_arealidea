import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RequestModule } from './request/request.module';
import {RequestItem} from "./request/request.model";
import { ProjectModule } from './project/project.module';
import {Project} from "./project/project.model";
import { State } from "./status/state.model";
import {StateModule} from "./status/state.module";
import {RequestState} from "./status/request-states.model";




@Module({
    controllers: [],
    providers: [],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'test_arealidea',
            models: [RequestItem, Project,State,RequestState],
            autoLoadModels: true
        }),
        RequestModule,
        ProjectModule,
        StateModule,

    ]
})
export class AppModule {

}

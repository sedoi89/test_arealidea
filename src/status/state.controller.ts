import {Body, Controller, Post} from '@nestjs/common';
import {StateService} from "./state.service";
import {StatusDto} from "./dto/status.dto";

@Controller('status')
export class StateController {
    constructor(private reqStatus: StateService) {
    }

    @Post()
    createNewStatus(@Body() dto: StatusDto) {

        return this.reqStatus.setState(dto)
    }
}


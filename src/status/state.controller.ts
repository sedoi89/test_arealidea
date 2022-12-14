import {Controller, Post} from '@nestjs/common';
import {StateService} from "./state.service";

@Controller('status')
export class StateController {
    constructor(private  reqStatus: StateService) {}
@Post()
    createNewStatus() {

    return this.reqStatus.setState()
}
}


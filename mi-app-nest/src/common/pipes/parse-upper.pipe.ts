import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { clearLine } from "readline";

@Injectable()
export class ParseUpperPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
    }
}
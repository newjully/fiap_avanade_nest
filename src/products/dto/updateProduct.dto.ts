import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDTO } from "./creatProduct.dto";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
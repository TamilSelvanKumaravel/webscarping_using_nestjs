import { Controller, Get, HttpStatus, Post, Req, Res, UseFilters } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";
import {Request,Response} from 'express' 
import { HttpExceptionFilter } from "./filters";
import { BadRequestException } from "@nestjs/common/exceptions";

@Controller('scrap')
export class ScrapingController{
    constructor(private scrapingService:ScrapingService){

    }
@Get()
@UseFilters(new HttpExceptionFilter())
  async getScrap(@Req() req:Request,@Res() res:Response){
    try{ 
    const data= await this.scrapingService.getScrap1()
    res.status(HttpStatus.CREATED).send(data)
    }catch(error){
        throw new BadRequestException()
    }
}
@Post('post')
postScrap(){
return this.scrapingService.postScrap1()
    //return this.scrapingService.getScrap1()
}

}


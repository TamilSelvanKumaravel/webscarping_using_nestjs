import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './scraping/middleware';
import { ScrapingModule } from './scraping/scaraping.module';
import { ScrapingController } from './scraping/scraping.controller';
import { ScrapingService } from './scraping/scraping.service';

@Module({
  imports: [ScrapingModule],
  controllers:[ScrapingController],
  providers:[ScrapingService]
})
export class AppModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    try{
    console.log("Request2.....")
    consumer.apply(LoggerMiddleware)
    .forRoutes({path:'scrap' ,method:RequestMethod.GET})
    }
    catch(error){
      throw new Error('rout not found');
    }
  }
}

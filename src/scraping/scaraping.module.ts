import { PuppeteerModule } from 'nest-puppeteer';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { ScrapingService } from './scraping.service';
import { LoggerMiddleware } from './middleware';

@Module({
  imports: [/*PuppeteerModule.forRoot(
    {pipe: true},
    'BrowserInstanceName'
  )*/],
  controllers: [ScrapingController],
  providers: [ScrapingService],
  exports:[ScrapingService]
})
export class ScrapingModule{}
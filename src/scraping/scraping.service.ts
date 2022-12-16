import { Injectable } from "@nestjs/common";
import type { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
//import {PuppeteerModule} from 'nest-puppeteer'
import * as puppeteer from 'puppeteer'
@Injectable({})
export class ScrapingService{
    //constructor(
      //  @InjectContext() private readonly browserContext:BrowserContext,
    //){}
     async getScrap1(){
        try {
            const selectors={
                searchBox:'#twotabsearchtextbox',
                nextbutton:'[class="s-pagination-strip"]'
            }
            
               const URL = 'https://www.amazon.com/'
               const browser = await puppeteer.launch({
               headless: false,
               //waitUntil:'load',
              // timeout:0  
            })
            
               const page = await browser.newPage()
               await page.setDefaultNavigationTimeout(0);
               await page.goto(URL, {
                waitUntil: 'load',
                // Remove the timeout
                timeout: 0
            })
              
               await page.type(selectors.searchBox,'mobile')
               await page.keyboard.press('Enter')
               await page.waitForNavigation() 
               
               let newResults = await page.evaluate(() => {
                  
                   let results = []
                      let items = document.querySelectorAll('div.s-result-item[data-component-type=s-search-result]')
                      items.forEach((item) => {
                          const link=item.querySelector('h2>a')
                          results.push(link)
                      })
                      for(let i=0;i<results.length;i++){
                        results[i]=results[i].href
                      }
                      return results
                  
                  })
                  let finallresults=[]
                  for(let i=0;i<2;i++){
                   var res=JSON.stringify(newResults[i])
                  // console.log(res)
                   var url=res.slice(1,res.length-1)
                   var replaced=url.replace(/"/g,` `)
                    //console.log(replaced)
          
                await page.goto(replaced)
                let newResults2 = await page.evaluate((replaced) => {
                   let results2 = []
                    results2.push({
                          // Url:replaced,
                           Title: document.querySelector('#productTitle').innerHTML,
                       })
                       results2.push({
                           Price: document.querySelector('#apex_desktop span.a-offscreen').innerHTML
                       })
                   return   results2
               },replaced)
               for(let j=0;j<newResults2.length;j++){
                   var title_res=JSON.stringify(newResults2[0])
                   //console.log(title_res)
                   var url2=title_res.slice(2,title_res.length-2)
                   var title=url2.replace(/"/g,` `)
                   //console.log(title)
                   var price_res=JSON.stringify(newResults2[1])
                   //console.log(price_res)
                   var url2=price_res.slice(2,price_res.length-2)
                   var price=url2.replace(/"/g,` `)
                   //console.log(price)
                  }
                finallresults.push(replaced,title,price)
                }
                   
            await browser.close()
            return finallresults    
            }catch(error){
               console.log(error)
           }    
     }


async postScrap1(){
    return"Posted"
}
}
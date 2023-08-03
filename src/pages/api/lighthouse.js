import lighthouse from "lighthouse";
import puppeteer from 'puppeteer';


export const launchChromeAndRunLighthouse = async (url) => {

   const browser = await puppeteer.launch({
       headless: true,
       defaultViewport: null,
       ignoreDefaultArgs: ['--enable-automation'],
   }) ;

   const page = await browser.newPage();
   const {lhr} = await lighthouse(url, undefined, undefined, page);
   await browser.close();

   return lhr ;

}


const handler = async (req,res) => {

    const input = req.body?.input ;
    const data = [] ;

    try {

        const urls = input ;

        for (const url of urls) {
            data.push({
                url: url ,
                data : await launchChromeAndRunLighthouse(url)
            });
        }
        return res.status(200).json(data) ;

    } catch (error) {
        return res.status(500).json({error}) ;
    }

}

export default handler ;







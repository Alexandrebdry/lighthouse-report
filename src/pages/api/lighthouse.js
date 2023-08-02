import lighthouse from "@/pages/api/lighthouse";
import * as chromeLauncher from "chrome-launcher";
import * as fs from 'node:fs';

export const launchChromeAndRunLighthouse = async (url) => {

    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const options = {
        logLevel: "info",
        output: "json",
        preset: "desktop",
        skipAudits: ["pwa"],
        disableFullPageScreenshot: true,
        quit: true,
        onlyCategories: ["performance"] ,
        port: chrome.port
    };

    const data = await lighthouse(url, options);
    await chrome.kill();

    return data.lhr ;


}


const handler = async (req,res) => {

    const input = req.body?.input ;
    const data = [] ;

    try {

        const urls = input ;
        console.log("urls", urls)

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







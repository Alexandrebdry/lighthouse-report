import lighthouse from "lighthouse";
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

const main = async () => {
    const input  = process.argv[2] ;

    fs.readFile(
        input,
        async (err, buffer) => {
            if (err) throw err;

            const data = [] ;
            const urls = JSON.parse(buffer);

            for (const url of urls) {
                data.push({url: url , data :await launchChromeAndRunLighthouse(url) });
            }

            const path = process.argv.length === 3 ? 'lh-report.json' : process.argv[3] ;

           fs.writeFile( path, JSON.stringify(data), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        });


}

main() ;






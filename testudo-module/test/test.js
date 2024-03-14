import fs from 'fs';
import lighthouse from 'lighthouse';
// imports the desktop-specific parameters for config
import config from './config.js';
const { desktopConfig, options, chrome } = config;
import 'dotenv/config';

const PROJECTID = process.env.PROJECTID

const URL = process.env.URL

const runLighthouse = async (address, projectID) => {

  console.log('address is ', address);
  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // return response.json();
    return;
  };

  const runnerResult = await lighthouse(
    address,
    options,
    desktopConfig
  );

  // `.report` is the HTML report as a string
  // const reportHtml = runnerResult.report;
  // fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', address);
  console.log(
    'Performance score was',
    runnerResult.lhr.categories.performance.score * 100
  );
  // object containing base metrics, eventually will display these to web app
  const metricsHolder = {
    projectID: PROJECTID,
    firstContentfulPaint:
      runnerResult.lhr.audits['first-contentful-paint'].numericValue,
    speedIndex: runnerResult.lhr.audits['speed-index'].numericValue,
    largestContentfulPaint:
      runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
    totalBlockingTime:
      runnerResult.lhr.audits['total-blocking-time'].numericValue,
    cumulativeLayoutShift:
      runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
    performance: runnerResult.lhr.categories.performance.score * 100,
  };

  console.log(metricsHolder);

  postData(
    `http://localhost:3001/projects/${projectID}`,
    metricsHolder
  );

  await chrome.kill();
}

export default runLighthouse;

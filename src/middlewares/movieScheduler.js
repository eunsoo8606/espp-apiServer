const cron        = require('node-cron');
const movieServie = require('../routes/v1/apis/movie/service/movie.service');
//해당 미들웨어 설치 필요
// npm i axios cheerio selenium-webdriver/chrome chromedriver --save
// selenium-webdriver/chrome or chromedriver 는 아마 -g 로 태그 넣어서 설치
// 환경변수로 지정해놔야 크롬이랑 로컬이랑 연동되어 조작 가능

//미들웨어 require
const axios = require('axios');
const cheerio = require('cheerio');
const {Builder, By, Key, until} = require('selenium-webdriver'); 
var chrome = require('selenium-webdriver/chrome');



//크롭 option 객체 생성.
var chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
const url = 'https://www.lottecinema.co.kr/NLCHS/Movie/List?flag=1';
/*
second	0-59
minute	0-59
hour	0-23
day of month	1-31
month	1-12 (or names)
day of week	0-7 (or names, 0 or 7 are sunday
*/ 

var job = cron.schedule('40 17 1-31 * *',()=>{
            var now = new Date();
            console.log('movie 스케줄러 동작함.',now);

            (async function example() { 
                //크롬 브라우저 기본 셋팅
                let driver = await new Builder().forBrowser('chrome').withCapabilities(chromeOptions).build();
                var movieList = new Array();
            try { 
                //크롬 브라우저 OPEN
                await driver.get(url); 
                //특정 ELEMENT LOAD될때까지 대기 10초로 설정.
                await driver.wait(until.elementsLocated(By.css('#contents')),10000);
                //특정 엘리먼트 값 추출
                const num_info = await driver.findElements(By.className('num_info'));
                const tit_info = await driver.findElements(By.className('tit_info'));
                const roboto_info = await driver.findElements(By.className('roboto')); //상영시간
                //XPATH 를 통하여 ID 나 CLASS가 없는 태그 선택하여 값 추출
                const img = await driver.findElements(By.xpath('//*[@id="contents"]/div/ul[4]/li//img[@*]'));


                console.log("num_info : ", num_info)
                console.log("tit_info : ", tit_info)
                console.log("roboto_info : ", roboto_info)

            
                let movie = null;
                let j  = 0;
                //JSON으로 PARSING 작업
                for (let i = 0; i < num_info.length; i++) {
                        movie = new Object();
                        //순위나 TITLE 이 없는 값은 담지 않음.
                        // 가변배열이라 맞춰주기 위한 조건문.
                        //롯데시네마에서 값을 보면 순위가 없고 AD 라는 값이 있어 해당 값이라면 값 담지 않는다.
                        if(await num_info[i].getText() === "AD"){
                            j--;
                        }
                        else{

                            //OBJECT 에 담기
                            movie.img    = await img[i].getAttribute('src');
                            movie.rank   = await num_info[i].getText();
                            movie.title  = await tit_info[j].getText();
                            movie.time   = await roboto_info[j].getText() + '분'; //상영시간
                            //배열에 PUSH
                            movieList.push(movie);
                        }
                        j++;
                     }
                } finally{ 
                    driver.quit();
                    console.log("api 스케줄러 삭제..")
                    movieServie.delete().then((data)=>{
                        console.log("api 스케줄러 삭제 완료 후 data insert 진행..");
                        movieServie.insert('',movieList).then((data)=>{
                            if(data > 0)
                            console.log("Scheduler success!");
                            else 
                            console.log("Scheduler fail..")
                        });
                    });
                } 
            })();
          });

module.exports = job;
const router = require("express").Router();
const axios = require("axios")
const cheerio = require('cheerio');

module.exports = router

// amazon - book info
router.post('/read', async(req,res)=>{
    // const url = 'https://www.amazon.com/Tales-Mystery-Terror-Illustrated-Classics-ebook/dp/B006Z33UIU/?_encoding=UTF8&pd_rd_w=aauXK&pf_rd_p=a654ad73-af1c-40d7-8dbb-00cce9c459f1&pf_rd_r=GJPMDC8SFMVDC5TQNFM5&pd_rd_r=1b5d8070-9463-4f59-9cda-c67c8138ba87&pd_rd_wg=t9x3m&ref_=pd_gw_ci_mcx_mr_hp_atf_m'
    const {url} = req.body

axios(url, {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}   
}).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const productInfo = [
        {
            description: $('div#bookDescription_feature_div').text().trim(),
            imageUrl: $('img#imgBlkFront').attr('src') === undefined ? $('img#ebooksImgBlkFront').attr('src') : $('img#imgBlkFront').attr('src') 
        }
    ] 
    return res.json(productInfo);

}) 
})
// steam - game info
router.post('/play', async(req,res)=>{
    // const url = 'https://store.steampowered.com/app/638230/Journey/'
    const {url} = req.body


axios(url, {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"}  
}).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const productInfo = [
        {
            description: $('div.game_description_snippet').text().trim(),
            imageUrl: $('img.game_header_image_full').attr('src')
        }
    ] 
    return res.json(productInfo);



})
})
// imdb - shows/movie info
router.post('/watch', async(req,res)=>{
    // const url = 'https://www.imdb.com/title/tt0944947/?ref_=tt_sims_tt_i_1'
    const {url} = req.body

axios(url, {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}   
}).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const productInfo = [
        {
            description: $('span[data-testid=plot-xs_to_m]').text().trim(),
            imageUrl: $('img.ipc-image').attr('src')
        }
    ] 
    return res.json(productInfo);

})
})



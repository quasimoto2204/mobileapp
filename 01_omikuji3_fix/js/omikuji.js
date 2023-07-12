"use strict";

let n="";
let nBefore="";



window.addEventListener("DOMContentLoaded", 
function() {
  // ページ本体が読み込まれたタイミングで実行するコード

  // ヘッダーのテキストエフェクト
  $("header").textillate({
    loop: false, // ループのオンオフ
    minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
    initialDelay: 2000,   // 遅延時間
    autoStart: true,      // アニメーションを自動的にスタート
    in: {                 // フェードインのエフェクトの詳細設定
    effect: "fadeInLeftBig", // エフェクトの名前（animate.css参照）
    delayScale: 1.5,         // 遅延時間の指数
    delay: 50,               // 文字ごとの遅延時間
    sync: false,             // trueはアニメーションをすべての文字に同時に適用
    shuffle: true            // trueは文字を順番にではなく、ランダムに
    }
  });

  // おみくじボタン（id="btn1"）　ボヤァと表示させる
  $(function() {
    ScrollReveal().reveal("#btn1", { duration: 9000 });
  });

  setTimeout(
    function() {
    let popMessage = "いらっしゃい！おみくじ引いてって！";
    window.alert(popMessage);
  }, "5000");
}, false);

    
  



// おみくじボタン
let soundEndflag="0";
const btn1 = document.getElementById("btn1");
const omikujiText=document.getElementById("omikujiText");
const omikujiTextImage=document.getElementById("omikujiTextImage");

btn1.addEventListener("click",
    function () {
        
        if(soundEndflag==="1"){
          soundControl("end","");
        }
        btn1.style.transition="1s";
        
        let resultText=["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png"];
        let resultMaxSpeed = [10,10,8,5,5];
        let resultMaxSize = [30,30,30,40,30];
        let resultImage = ["img/2.png","img/1.png","img/3.png","img/sakura_hanabira.png","img/leaf.png","img/snowflakes.png"];
        let resultSound =["sound/cha-ching-7053.mp3","sound/cha-ching-7053.mp3","sound/clap-44774.mp3","sound/clap-44774.mp3","sound/wah-wah-sad-trombone-6347.mp3"]


        // let n = Math.floor(Math.random() * resultText.length);
        while (n === nBefore) {
          n = Math.floor(Math.random() * resultText.length);
        }
    
        nBefore = n;
       

        omikujiTextImage.src=resultText[n];
        omikujiTextImage.classList.add("omikujiPaper");
        omikujiTextImage.addEventListener("animationend",
          function(){
            omikujiTextImage.classList.remove("omikujiPaper");
          },false
        );
        


        // omikujiText.textContent = resultText[n];
        // omikujiText.style.color = resultColor[n];
        // omikujiText.style.fontSize = resultFontSize[n];
        
        w_sound=resultSound[n];
        soundControl("start",w_sound);
        soundEndflag="1";
       

        // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        setTimeout(
          function(){
            $(document).ready(function () {
              $(document).snowfall({
                  maxSpeed:resultMaxSpeed[n],// 最大速度
                  minSpeed: 1, // 最小速度
                  maxSize:resultMaxSize[n], // 最大サイズ
                  minSize: 1, // 最小サイズ
                  image:resultImage[n] ,
              });
          });
          },"200"
          
        );
        
    }, 
    false
);

let w_sound
let music
function soundControl(status,w_sound){
  if(status==="start"){
    music=new Audio(w_sound);
    music.currentTime=0;
    music.play()
 } else if(status==="end"){
  music.pause();
  music.currentTime=0;

 }


}


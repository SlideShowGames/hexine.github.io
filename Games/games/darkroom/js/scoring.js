var Score={name:"Score",options:{},init:function(e){this.options=$.extend(this.options,e)},calculateScore:function(){for(var e=Prestige.getStores(!1),t=0,o=[1,1.5,1,2,2,3,3,2,2,2,2,1.5,1,1,10,30,50,100,150,150,3,3,5,4],r=0;r<o.length;r++)t+=e[r]*o[r];return t+=10*$SM.get('stores["alien alloy"]',!0),t+=500*$SM.get('stores["fleet beacon"]',!0),t+=50*Ship.getMaxHull(),Math.floor(t)},save:function(){$SM.set("playStats.score",Score.calculateScore())},totalScore:function(){return $SM.get("previous.score",!0)+Score.calculateScore()}};
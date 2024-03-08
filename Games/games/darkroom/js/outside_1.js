Events.Outside=[{title:_("A Ruined Trap"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get('game.buildings["trap"]',!0)>0},scenes:{start:{text:[_("some of the traps have been torn apart."),_("large prints lead away, into the forest.")],onLoad:function(){var e=Math.floor(Math.random()*$SM.get('game.buildings["trap"]',!0))+1;$SM.add('game.buildings["trap"]',-e),Outside.updateVillage(),Outside.updateTrapButton()},notification:_("some traps have been destroyed"),blink:!0,buttons:{track:{text:_("track them"),nextScene:{.5:"nothing",1:"catch"}},ignore:{text:_("ignore them"),nextScene:"end"}}},nothing:{text:[_("the tracks disappear after just a few minutes."),_("the forest is silent.")],notification:_("nothing was found"),buttons:{end:{text:_("go home"),nextScene:"end"}}},catch:{text:[_("not far from the village lies a large beast, its fur matted with blood."),_("it puts up little resistance before the knife.")],notification:_("there was a beast. it's dead now"),reward:{fur:100,meat:100,teeth:10},buttons:{end:{text:_("go home"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_RUINED_TRAP},{title:_("Fire"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get('game.buildings["hut"]',!0)>0&&$SM.get("game.population",!0)>50},scenes:{start:{text:[_("a fire rampages through one of the huts, destroying it."),_("all residents in the hut perished in the fire.")],notification:_("a fire has started"),blink:!0,onLoad:function(){Outside.destroyHuts(1)},buttons:{mourn:{text:_("mourn"),notification:_("some villagers have died"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_HUT_FIRE},{title:_("Sickness"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get("game.population",!0)>10&&$SM.get("game.population",!0)<50&&$SM.get("stores.medicine",!0)>0},scenes:{start:{text:[_("a sickness is spreading through the village."),_("medicine is needed immediately.")],notification:_("some villagers are ill"),blink:!0,buttons:{heal:{text:_("1 medicine"),cost:{medicine:1},nextScene:{1:"healed"}},ignore:{text:_("ignore it"),nextScene:{1:"death"}}}},healed:{text:[_("the sickness is cured in time.")],notification:_("sufferers are healed"),buttons:{end:{text:_("go home"),nextScene:"end"}}},death:{text:[_("the sickness spreads through the village."),_("the days are spent with burials."),_("the nights are rent with screams.")],notification:_("sufferers are left to die"),onLoad:function(){var e=Math.floor(Math.random()*Math.floor($SM.get("game.population",!0)/2))+1;Outside.killVillagers(e)},buttons:{end:{text:_("go home"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_SICKNESS},{title:_("Plague"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get("game.population",!0)>50&&$SM.get("stores.medicine",!0)>0},scenes:{start:{text:[_("a terrible plague is fast spreading through the village."),_("medicine is needed immediately.")],notification:_("a plague afflicts the village"),blink:!0,buttons:{buyMedicine:{text:_("buy medicine"),cost:{scales:70,teeth:50},reward:{medicine:1}},heal:{text:_("5 medicine"),cost:{medicine:5},nextScene:{1:"healed"}},ignore:{text:_("do nothing"),nextScene:{1:"death"}}}},healed:{text:[_("the plague is kept from spreading."),_("only a few die."),_("the rest bury them.")],notification:_("epidemic is eradicated eventually"),onLoad:function(){var e=Math.floor(5*Math.random())+2;Outside.killVillagers(e)},buttons:{end:{text:_("go home"),nextScene:"end"}}},death:{text:[_("the plague rips through the village."),_("the nights are rent with screams."),_("the only hope is a quick death.")],notification:_("population is almost exterminated"),onLoad:function(){var e=Math.floor(80*Math.random())+10;Outside.killVillagers(e)},buttons:{end:{text:_("go home"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_PLAGUE},{title:_("A Beast Attack"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get("game.population",!0)>0},scenes:{start:{text:[_("a pack of snarling beasts pours out of the trees."),_("the fight is short and bloody, but the beasts are repelled."),_("the villagers retreat to mourn the dead.")],notification:_("wild beasts attack the villagers"),onLoad:function(){var e=Math.floor(10*Math.random())+1;Outside.killVillagers(e)},reward:{fur:100,meat:100,teeth:10},blink:!0,buttons:{end:{text:_("go home"),notification:_("predators become prey. price is unfair"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_BEAST_ATTACK},{title:_("A Military Raid"),isAvailable:function(){return Engine.activeModule==Outside&&$SM.get("game.population",!0)>0&&$SM.get("game.cityCleared")},scenes:{start:{text:[_("a gunshot rings through the trees."),_("well armed men charge out of the forest, firing into the crowd."),_("after a skirmish they are driven away, but not without losses.")],notification:_("troops storm the village"),onLoad:function(){var e=Math.floor(40*Math.random())+1;Outside.killVillagers(e)},reward:{bullets:10,"cured meat":50},blink:!0,buttons:{end:{text:_("go home"),notification:_("warfare is bloodthirsty"),nextScene:"end"}}}},audio:AudioLibrary.EVENT_SOLDIER_ATTACK}];